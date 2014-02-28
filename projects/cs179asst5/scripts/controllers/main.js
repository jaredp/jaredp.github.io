'use strict';

angular.module('bookClubApp')
  .controller('MainCtrl', function ($scope, $firebase, FBURL) {

	var clean_str = function(str) {
		if (str == null) {
			return '';
		}

		return str.trim();
	}

    $scope.books = new $firebase(new Firebase(FBURL + '/books'));

    $scope.addBook = function() {
    	var title = clean_str($scope.newbook_title);
    	var author = clean_str($scope.newbook_author);
    	var cover = clean_str($scope.newbook_cover);

    	if (title == '') {
    		// don't add books with no title
    		return;
    	}

    	$scope.books.$add({
    		title: title,
    		author: author,
    		cover: cover,
    		comments: {}
    	})

    	$scope.newbook_title = '';
    	$scope.newbook_author = '';
    	$scope.newbook_cover = '';
    };

    // This should really be persisted per-user in firebase
    // but whatever
    $scope.book_is_favorite = function(bkid) {
    	return localStorage[bkid + "-is-favorite"];
    }

    $scope.book_set_favorite = function(bkid, is_favorite) {
    	localStorage[bkid + "-is-favorite"] = is_favorite;
    }

    $scope.show_comments = {}

    $scope.addComment = function(comment, book) {
    	var comments = new Firebase(FBURL + '/books/' + book.$id + '/comments');
    	comments.push({
    		content: comment,
    		time: new Date().getTime()
    	});
    }

  });
