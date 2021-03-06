/* eslint-disable indent */
import store from './store';
 
 
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/caleb';
 
const listApiFetch = function (...args) {
 let error;
 return fetch(...args)
   .then(res => {
     if (!res.ok) {
       error = { codes: res.status };
       if (!res.headers.get('content-type').includes('json')) {
         error.message = res.statusText;
         return Promise.reject(error);
       }
     }
     return res.json();
   })
   .then(data => {
     if (error) {
       error.message = data.message; //ask mentor about this
       return Promise.reject(error);
     }
     //console.log(error.message) //ask mentor about this - the message shows once error happens
     return data;
   });
};
 
const getBookmarks = function () {
 return listApiFetch(`${BASE_URL}/bookmarks`);
};
 
const createBookmark = function (newBookmark) {
   //console.log('CREATE BUTTON GOES OFF');
//  const newBookmark = JSON.stringify({
//      'title':title,
//      'url': url,
//      'rating': rating,
//      'desc': description
//    });
   //console.log(newBookmark);
 return listApiFetch(`${BASE_URL}/bookmarks`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: newBookmark
 });
};
 
const editBookmark = function (id, updateData) {
 const newData = JSON.stringify(updateData);
 return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
   method: 'PATCH',
   headers: {
     'Content-Type': 'application/json',
   },
   body: newData
 });
};
 
const deleteBookmark = function (id) {
 return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
   method: 'DELETE'
 });
};
 
export default {
 getBookmarks,
 createBookmark,
 editBookmark,
 deleteBookmark
};
