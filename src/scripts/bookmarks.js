/* eslint-disable indent */
import $ from 'jquery';
import store from './store.js';
import api from './api';
//This bookmark.js file holds all the event listeners for the app
//and the html that's being rendered in the page



//User story Requirement met upon initially loading page:
// "I can see a list of my bookmarks when I first open the app"
// should be able to see the bookmarks I added as tests


//generateMainPageLayout meets the following user story:
// "I can select from a dropdown (a <select> element) a "minimum rating" 
// to filter the list by all bookmarks rated at or above the chosen selection"
// the handleRatingFilter event handler actually controls the filtering of the bookmarks
const generateMainPageLayout = () => {
    return `
    <section class="container">
        <h1>My Bookmarks</h1>
        <div class="error-container shadow"></div>
        <div class="even-flex js-add-bookmark-button ">
          <button class='js-add-bookmark shadow'></button>
          <select class='js-filter-rating shadow'>
            <option value="0">rating</option>
            <option value="1">1+ ♥</option>
            <option value="2">2+ ♥</option>
            <option value="3">3+ ♥</option>
            <option value="4">4+ ♥</option>
            <option value="5">5 ♥</option>
          </select>
        </div>
        <div id="js-add-new-bookmark" class="js-add-new-bookmark"></div>
    </section>
    <section class="container">
        <ul id="js-bookmark-list" class="bookmark-list"></ul>
    </section>
    `;
};
//generateForm meets the following user stories:
// "I can add bookmarks to my bookmark list. Bookmarks contain: title, url link, description, rating (1-5)"
// "I receive appropriate feedback when I cannot submit a bookmark"
  // NOTE: 
      // the handleSubmitNewBookmark event handler actually controls the submission of the bookmarks
      // AND the handleAddNewBookmarkClick event handler allows user to open bookmark form (generateForm)



// Did the student use a <form> to add a new bookmark that contains 
// required fields to capture a bookmark's title, url, description and rating?
  // yes, see generateForm below:
// Did the student group and label inputs appropriately?
  // yes, see generateForm below:




//generateForm is the form page with a place to input: Title, URL, rating and description 
const generateForm = () => {
    //form includes labels - a11y requirements
    //and the "for" attr matches the "id" - a11y requirements
    return `
    <form id="js-add-new-bookmark-form" class="js-add-new-bookmark-form">
        <div class="even-flex flex-direction">
            <fieldset class="flex-desktop">
                <label for="bookName">Add Bookmark Title</label>
                <input type="text" id="bookName" name="title" class="js-bookmark-title-entry" placeholder="write title here" required/>
            </fieldset>
            
            <fieldset class="flex-desktop">
                <label for="siteURL">Add Site</label>
                <input type="text" id="siteURL" name="url" class="js-bookmark-url-entry" placeholder="e.g., https://google.com" required/>
            </fieldset>
        </div>
        <div>
            <fieldset>
                <label for="addDescr">Add Description</label>
                <textarea name="desc" id="addDescr" class="js-bookmark-desc-entry textarea-newadd" maxlength="300" required></textarea>
            </fieldset>
        </div>

        <div class="flex-between">
            <div class="rating left-side heart-size" aria-label="please select rating for new bookmark">
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" required/>
                    <span class="icon">♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>   
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                </label>
            </div>
            <button class="right-side add-button" type= "submit">CREATE</button>
        </div>
    </form>`;
}


// generateBookmarkElement & generateExpandedBookmarkElement adds html elements to the DOM, which are rendered by renderPage
//  generateBookmarkElement meets the following user story:
//  "All bookmarks in the list default to a "condensed" view showing only title and rating"
const generateBookmarkElement = (bookmark, hearts) => {
    return `
      <li class="js-bookmark-item shadow" data-item-id="${bookmark.id}">
        <div class="top-half" tabindex=0>
          <h2>${bookmark.title}</h2>
        </div>
        <div class="bottom-half">
          <div class="rating even-flex">
          <span class="icon background-hearts">${hearts}</span>
          
          </div>
        </div>
      </li>
    `;
  };
//  generateExpandedBookmarkElement meets the following user stories:
//  "I can click on a bookmark to display the "detailed" view"
// "Detailed view expands to additionally display description and a "Visit Site" link"
    //NOTE: 
      // the clicking -- is controlled by the event handler (handleClickToExpandBookmark),
      // which actually triggers the expanding action
      // also the link actually opens to the correct website
const generateExpandedBookmarkElement = (bookmark) => {
    return `
    <li class="js-bookmark-item" data-item-id="${bookmark.id}">
       <div class="top-half" tabindex=0>
            <h2 class="bookmark-title">${bookmark.title}</h2>
       </div>
       <div class="flex-details">
            <div class="flex-link">
                <button class="flex-button" aria-label="click to visit bookmark" onclick=" window.open('${bookmark.url}','_blank')">visit</button>
            </div>
            <textarea name="desc" class="js-bookmark-desc-entry flex-desc" maxlength="300" required>${bookmark.desc}</textarea>
        </div>
        <div class="bottom-half flex-between">
            <div class="rating left-side heart-size>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" ${bookmark.rating == 1 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" ${bookmark.rating == 2 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" ${bookmark.rating == 3 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" ${bookmark.rating == 4 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" ${bookmark.rating == 5 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
            </div>
            <div class="right-side">
                <button class="js-bookmark-save expand-buttons shadow" aria-label="click to save bookmark"><span class="buttonLabel">save</span></button>
                <button class="js-bookmark-delete expand-buttons shadow" aria-label="click to delete bookmark"><span class="buttonLabel">delete</span></button>
            </div>
        </div>
    </li>
       `;
};

const generateHeartRating = (number) => {
    let hearts = '';
    for(let i = 0; i < number; i++) {
      hearts += '♥';
    }
    return `<span class="icon colored-hearts">${hearts}</span>`;
  };

  // generateBookmarkString is the function that generates a string of bookmarks
  const generateBookmarkListString = (bookmarkList) => {
    const bookmarks = bookmarkList
     //.map passes the bookmark function that's then applied to every element of the array
    //returns a new array
      .filter((bookmark) => {
        return bookmark.rating >= store.rating;
      }).map((bookmark) => (!bookmark.expand) ? generateBookmarkElement(bookmark, generateHeartRating(bookmark.rating)) : generateExpandedBookmarkElement(bookmark));
    return bookmarks.join('');
  };



// Did the student create at least one render function 
// (that may or may not call other rendering functions) 
// that conditionally replaces the content of the <main> tag 
// based upon the properties held within the `store`?
  // Yes, see below:
// Is all JavaScript that updates the DOM of the page located inside of a rendering function?
  // Yes, see below: 
  //for example: 
      // $('.js-add-new-bookmark').html(generateForm());

  const render = () => {
    renderError();
    $('main').html(generateMainPageLayout);
    if (store.addNewBookmark) {
      $('.js-add-new-bookmark').html(generateForm());
    } else {
      $('.js-add-new-bookmark').empty();
    }
    let bookmarks = [...store.bookmarks];
    //This renders the bookmark list in the DOM
    const bookmarkListString = generateBookmarkListString(bookmarks);
    //This inserts the HTML into the DOM
    $('.js-add-bookmark').html(!store.addNewBookmark ? 'add' : 'cancel');
    $('#js-bookmark-list').html(bookmarkListString);
  };

// Does the user receive feedback when errors occur? 
  // yes + errors occur whenever user doesn't complete required fields in form
  // user feedback for incorrect url is:
    // "Attribute `url` must be min length 5 and begin http(s)://""
  const generateError = (message) => {
    return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
  };

const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-bookmark-item')
      .data('item-id');
};

//Did the student update `store` properties only within event handler functions?
  // yes, see e handlers below:

// -----------------------event handlers -------------- //

const renderError = () => {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  };
//ask mentor about this
  const handleCloseError = () => {
    $('.error-content').on('click', '#cancel-error', () => {
      // console.log('error button is working');
      store.setError(null);
      renderError();
    });
  };

// event handler that allows user to open bookmark form 
  const handleAddNewBookmarkClick = () => {
    $('main').on('click','.js-add-bookmark', event => {
        event.preventDefault();
        store.toggleAddNewBookmark();
        render();
    });
};
// event handler that handles bookmark submission  
const handleSubmitNewBookmark = () => {
    //console.log('CREATE BUTTON BOOKMARKS');
    $('main').on('submit', '.js-add-new-bookmark-form', event => {
      event.preventDefault();
      const newBookmarkData = $(event.target).serializeJson();
      api.createBookmark(newBookmarkData)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);
          store.toggleAddNewBookmark();
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    });
};

// generateExpandedBookmarkElement meets the following user story:
  // "I can click on a bookmark to display the "detailed" view"
  // AND this event handler (handleClickToExpandBookmark) actually triggers the expanding action
const handleClickToExpandBookmark = () => {
    $('main').on('click', '.top-half', event => {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      const bookmark = store.findById(bookmarkId);
      store.findAndUpdate(bookmarkId, {expand: !bookmark.expand});
      render();
      store.bookmarks.forEach(bookmark => bookmark.expand = false);
    });
  };  


// handleDeleteBookmark meets the following user story:  
//  "I can remove bookmarks from my bookmark list"
const handleDeleteBookmark = () => {
    $('main').on('click', '.js-bookmark-delete', event => {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      api.deleteBookmark(bookmarkId)
        .then(() => {
          store.findAndDelete(bookmarkId);
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    });
};
  
//handleRatingFilter meets the following user story:
// "I can select from a dropdown (a <select> element) a "minimum rating" 
// to filter the list by all bookmarks rated at or above the chosen selection"
// Note: the generateMainPageLayout is where the HTML for filter ratings is located
  const handleRatingFilter = () => {
    $('main').on('change', '.js-filter-rating', event => {
      store.rating = $(event.target).val();
      render();
    });
  };
  
//Extension feature - still working on this one! 
//Description is editable, but the edits aren't saving correctly just yet!
//handleBookmarkSaveClick meets the following user story:
//I can edit the rating and description of a bookmark in my list

const handleBookmarkSaveClick = () => {
    $('main').on('click', '.js-bookmark-save', event => {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      const newDesc = $('.js-bookmark-desc-entry').val();
      const newRating = $('input[name="rating"]:checked').val();
      const newData = JSON.stringify({desc: newDesc, rating: newRating});
      const parsedNewData = JSON.parse(newData);
      api.updateBookmark(bookmarkId, newData)
        .then(() => {
          store.findAndUpdate(bookmarkId, parsedNewData);
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    });
  };
  
$.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
});

//Did the student create single-purpose event handler functions to handle all events?
// Yes, see below + e handlers are commented w/ their purpose
const bindEventListeners = () => {
    handleAddNewBookmarkClick();
    handleSubmitNewBookmark();
    handleClickToExpandBookmark();
    handleDeleteBookmark();
    handleBookmarkSaveClick();
    renderError();
    handleCloseError();
    handleRatingFilter();
};


export default {
    generateMainPageLayout,
    generateForm,
    generateBookmarkElement,
    generateExpandedBookmarkElement,
    generateHeartRating,
    generateBookmarkListString,
    render,
    bindEventListeners,
}
