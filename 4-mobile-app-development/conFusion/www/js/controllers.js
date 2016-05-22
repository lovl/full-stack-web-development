angular.module('conFusion.controllers', [])

    //  Controller : AppCtrl
    // ------------------------------------------------------------------------
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, $cordovaToast) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      // LOGIN FORM
      // ----------------------------------------------------------------------
      // Form data for the login modal
      $scope.loginData = $localStorage.getObject('userinfo','{}');
      // Create the login modal that we will use later
      // --------------------------------------------------
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };

    
      // REGISTRATION FORM 
      // ----------------------------------------------------------------------
      // Form data for the registration modal
      $scope.registration = {};
      // Create the registration modal that we will use later
      $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.registerform = modal;
      });

      // Triggered in the registration modal to close it
      $scope.closeRegister = function () {
        $scope.registerform.hide();
      };

      // Open the registration modal
      $scope.register = function () {
        $scope.registerform.show();
      };

      // Perform the registration action when the user submits the registration form
      $scope.doRegister = function () {
      // Simulate a registration delay. Remove this and replace with your registration
      // code if using a registration system
      $timeout(function () {
          $scope.closeRegister();
        }, 1000);
      };
    
        $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
            };
         $scope.takePicture = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });

            $scope.registerform.show();
            console.log("Taking Picture.");
        };
    
        $scope.accessGallery = function() {  
            $cordovaImagePicker.getPictures({
                maximumImagesCount: 1,
                width: 200,
                height: 200,
                quality: 100   
            }).then (function(results) {
                if (results.length) {
                    $scope.registration.imgSrc = results[0];
                }
            }, function(err) {
               console.log(err); 
            });
            $scope.registerform.show();
            console.log("Accessing Gallery.");  
        };
        
      });
        
    
      // RESERVATION FORM       
      // Form data for the reservation modal
      $scope.reservation = {};
    
      // Create the reserve modal that we will use later
      // ----------------------------------------------------
      $ionicModal.fromTemplateUrl('templates/reserve.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.reserveform = modal;
      });

      // Triggered in the reserve modal to close it
      $scope.closeReserve = function() {
        $scope.reserveform.hide();
      };

      // Open the reserve modal
      $scope.reserve = function() {
        $scope.reserveform.show();
      };

      // Perform the reserve action when the user submits the reserve form
      $scope.doReserve = function() {
        console.log('Doing reservation', $scope.reservation);

        // Simulate a reservation delay. Remove this and replace with your reservation
        // code if using a server system
        $timeout(function() {
          $scope.closeReserve();
        }, 1000);
      };    

    })


    //  Controller : MenuController
    // ------------------------------------------------------------------------
    .controller('MenuController', ['$scope', 'dishes', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, dishes, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

        $scope.baseURL = baseURL;      
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        $scope.dishes = dishes;

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };

        $scope.addFavorite = function (index) {
            console.log("index is " + index);
            favoriteFactory.addToFavorites(index);
            $ionicListDelegate.closeOptionButtons();
            
            $ionicPlatform.ready(function () {
                // Notification
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dishes[index].name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dishes[index].name);
                },
                function () {
                    console.log('Failed to add Notification ');
                });
                // Toast
                $cordovaToast
                  .show('Added Favorite '+$scope.dishes[index].name, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });
            });
            
        }

    }])


    //  Controller : ContactController
    // ------------------------------------------------------------------------
    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])


    //  Controller : FeedbackController
    // ------------------------------------------------------------------------
    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                feedbackFactory.save($scope.feedback);
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])


    //  Controller : DishDetailController
    // ------------------------------------------------------------------------
    .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
            
        $scope.baseURL = baseURL;   
        $scope.dish = dish;
        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.comment = {rating:5, comment:"", author:"", date:""};

        //$scope.addToFavorites = function(index) {
        //    favoriteFactory.addToFavorites(index);
        //    $scope.closePopover();
        //};

        $scope.addFavorite = function (index) {
            favoriteFactory.addToFavorites(index);
            $ionicPlatform.ready(function () {
                // Notification
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dishes[index].name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dishes[index].name);
                },
                function () {
                    console.log('Failed to add Notification ');
                });
                // Toast
                $cordovaToast
                  .show('Added Favorite '+$scope.dishes[index].name, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });
            });
            $scope.closePopover();
        }
        
        // Popover
        // ----------------------------------------------------------------
        $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        // Open the popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };

        // Triggered in the popover to close it
        $scope.closePopover = function() {
            $scope.popover.hide();
        };




        // Modal
        $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
            scope: $scope 
        }).then(function (modal) {
            $scope.modal = modal
        });

        $scope.openModal = function($event) {
            $scope.closePopover();
            $scope.modal.show($event);
        };

        $scope.closeModal = function() {
            $scope.modal.hide();  
        };

        $scope.addComment = function() {
            $scope.comment.date = new Date().toISOString();
            console.log($scope.comment);
            $scope.dish.comments.push($scope.comment); 
            //menuFactory.update({id:$scope.dish.id},$scope.dish);  
            $scope.comment = {rating:5, comment:"", author:"", date:""};   
            $scope.closeModal();
        }


    }])


    //  Controller : DishCommentController
    // ------------------------------------------------------------------------
    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
        $scope.mycomment = {rating:5, comment:"", author:"", date:""};

        $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
        }
    }])


    //  Controller : IndexController
    // ------------------------------------------------------------------------
    .controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'dish', 'promotion', 'leader', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, dish, promotion, leader, baseURL) {
        $scope.baseURL = baseURL;
        $scope.showDish = false;
        $scope.message="Loading ..."; 
        $scope.dish = dish;
        $scope.promotion = promotion;
        $scope.leader = leader;

        // debugging
        console.log($scope.dish);
        console.log($scope.promotion);
        console.log($scope.leader);
    }])


    //  Controller : AboutController
    // ------------------------------------------------------------------------
    .controller('AboutController', ['$scope', 'corporateFactory', 'leaders', 'baseURL', function($scope, corporateFactory, leaders, baseURL) {
            
        $scope.baseURL = baseURL;  
        $scope.leaders = leaders;
        
        // debugging
        console.log($scope.leaders);
    }])


    //  Controller : FavoritesController
    // ------------------------------------------------------------------------
    .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPlatform', '$cordovaVibration', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $ionicPlatform, $cordovaVibration) {

        $scope.baseURL = baseURL;
        $scope.shouldShowDelete = false;
        $scope.favorites = favorites;
        $scope.dishes = dishes;          
        console.log($scope.dishes, $scope.favorites);

        $scope.toggleDelete = function () {
            $scope.shouldShowDelete = !$scope.shouldShowDelete;
            console.log($scope.shouldShowDelete);
        }
 
        $scope.deleteFavorite = function (index) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm Delete',
                template: 'Are you sure you want to delete this item?'
            });     
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');
                    favoriteFactory.deleteFromFavorites(index);
                    // Vibration Effect
                    $ionicPlatform.ready(function) {
                        $cordovaVibration.vibrate(200);
                    });
                } else {
                    console.log('Canceled delete');
                }
            }).then(function(res) {
                $scope.favorites = favoriteFactory.getFavorites()
            });
            
            $scope.shouldShowDelete = false;
        }     
    }])


    //  Filter : favoriteFilter
    // ------------------------------------------------------------------------
    .filter('favoriteFilter', function () {
        return function (dishes, favorites) {
            var out = [];
            for (var i = 0; i < favorites.length; i++) {
                for (var j = 0; j < dishes.length; j++) {
                    if (dishes[j].id === favorites[i].id)
                        out.push(dishes[j]);
                }
            }
            return out;
    }})

;