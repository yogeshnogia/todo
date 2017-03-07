angular.module('todo', [

])
  .controller('MainCtrl', function ($scope) {
      $scope.categories = [
          {"id": 0, "name": "Development"},
          {"id": 1, "name": "Design"},
          {"id": 2, "name": "Exercise"},
          {"id": 3, "name": "Humor"}
      ];

      $scope.bookmarks = [
          {"id": 0, "title": "AngularJS", "url": "http://github.com/yogeshnogia/", "category": "Development" },
          {"id": 1, "title": "github.io", "url": "http://github.com/yogeshnogia/", "category": "Development" },
          {"id": 2, "title": "ReactJs", "url": "http://github.com/yogeshnogia/", "category": "Design" },
          {"id": 3, "title": "RxJs", "url": "http://github.com/yogeshnogia/", "category": "Design" },
          {"id": 4, "title": "NodeJs", "url": "http://github.com/yogeshnogia/", "category": "Exercise" },
          {"id": 5, "title": "Gulp", "url": "http://github.com/yogeshnogia/", "category": "Exercise" },
          {"id": 6, "title": "Grunt", "url": "http://github.com/yogeshnogia/", "category": "Humor" },
          {"id": 7, "title": "Linux", "url": "http://github.com/yogeshnogia/", "category": "Humor" },
          {"id": 8, "title": "Line", "url": "http://github.com/yogeshnogia/", "category": "Humor" }
      ];

      $scope.isCreating = false;
      $scope.isEditing = false;
      $scope.currentCategory = null;
      $scope.editedBookmark = null;

      function isCurrentCategory(category) {
          return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
      }

      function setCurrentCategory(category) {
          $scope.currentCategory = category;

          cancelCreating();
          cancelEditing();
      }

      $scope.isCurrentCategory = isCurrentCategory;
      $scope.setCurrentCategory = setCurrentCategory;

      function setEditedBookmark(bookmark) {
          $scope.editedBookmark = angular.copy(bookmark);
      }

      function isSelectedBookmark(bookmarkId) {
          return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
      }

      $scope.setEditedBookmark = setEditedBookmark;
      $scope.isSelectedBookmark = isSelectedBookmark;

      function resetCreateForm() {
          $scope.newBookmark = {
              title: '',
              url: '',
              category: $scope.currentCategory.name
          };
      }

      //-------------------------------------------------------------------------------------------------
      // CRUD
      //-------------------------------------------------------------------------------------------------
      function createBookmark(bookmark) {
          bookmark.id = $scope.bookmarks.length;
          $scope.bookmarks.push(bookmark);

          resetCreateForm();
      }

      function updateBookmark(bookmark) {
          var index = _.findIndex($scope.bookmarks, function (b) {
              return b.id == bookmark.id
          });
          $scope.bookmarks[index] = bookmark;

          $scope.editedBookmark = null;
          $scope.isEditing = false;
      }

      function deleteBookmark(bookmark) {
          _.remove($scope.bookmarks, function (b) {
              return b.id == bookmark.id;
          });
      }

      $scope.createBookmark = createBookmark;
      $scope.updateBookmark = updateBookmark;
      $scope.deleteBookmark = deleteBookmark;

      //-------------------------------------------------------------------------------------------------
      // CREATING AND EDITING STATES
      //-------------------------------------------------------------------------------------------------
      function shouldShowCreating() {
          return $scope.currentCategory && !$scope.isEditing;
      }

      function startCreating() {
          $scope.isCreating = true;
          $scope.isEditing = false;
          resetCreateForm();
      }

      function cancelCreating() {
          $scope.isCreating = false;
      }

      $scope.shouldShowCreating = shouldShowCreating;
      $scope.startCreating = startCreating;
      $scope.cancelCreating = cancelCreating;

      function shouldShowEditing() {
          return $scope.isEditing && !$scope.isCreating;
      }

      function startEditing() {
          $scope.isCreating = false;
          $scope.isEditing = true;
      }

      function cancelEditing() {
          $scope.isEditing = false;
          $scope.editedBookmark = null;
      }

      $scope.startEditing = startEditing;
      $scope.cancelEditing = cancelEditing;
      $scope.shouldShowEditing = shouldShowEditing;
  })
;