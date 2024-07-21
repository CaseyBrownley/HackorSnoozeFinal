"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      <div>
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}
// retrieve delete btn
function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}
// retrieve star btn
function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// delete story function
async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  await putUserStoriesOnPage();
}
// SEND THIS FUNCTION TO CANDY!!!!

// add a new story on submit to the story list
async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();
$submitForm.onsubmit = "submitStory(user, newStory, title, author, url)" 
  formData = BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";
  formData.get("username");
  formData.get("newStory");
  formData.get("create-title");
  formData.get("create-author");
  formData.get("create-url");
addStory();
let $allStoriesList = $("#all-stories-list");
$allStoriesList.append(formData);
}

$submitForm.on("submit", submitNewStory);

// function to store users own stories on page
function showUserStories(){

  $navMyStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}
// $submitForm.onsubmit = "submitStory(user, newStory, title, author, url)" 
// }

// function submitStory(event){
//   event.preventDefault();
//   const newStory = 
// }

// add/remove favorite story and star/unstar
// put favorites list on page

// puts add favorites onto page
function putFavoriteListOnPage(){
  $favoritedStories.empty();

  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added!</h5>");
  }
  else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
  $favoritedStories.show();
}
//opens favorites page
function openFavorites(){
  $navMyStories.on("click", function(){
    window.location = "http://www.google.com/";    
  });
}

// favorite and unfavorite stories
async function toggleFavoriteStory(){
  console.debug("toggleStoryFavorite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);


  if ($tgt.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}


$storiesLists.on("click", ".star", toggleStoryFavorite);

// function toggleFavoriteStory(storyID) {
  // …..
// }
// make these variables alone in file
// button. addEventListener('click', (storyID) => { toggleFavoriteStory(storyID) } 
// only used for favorite button
// Const button = document.getElementById(‘starButton’)
// 1. On the list of stories page, add a class to the favorite/unfavorite button
// update starButton name
// 2. An example is ‘starButton’
// 3. Add a click event listener to all buttons with that class.
// Const button = document.getElementById(‘starButton’)
// button. addEventListener('click', (storyID) => { toggleFavoriteStory(storyID) }
// 4. In your ‘toggleFavoriteStory(storyID)’ function you can make an api call for that exact story using the storyID
// 5. Add or remove that story from the user’s favorites list