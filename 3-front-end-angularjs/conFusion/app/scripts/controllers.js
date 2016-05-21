'use strict';

angular.module('confusionApp')

        // MenuController
        // ------------------------------------------------------------------------------------
        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            // Handling Errors in Client-Server Communication
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                        
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
        }])


        // ContactController
        // -----------------------------------------------------------
        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {firstName:"", lastName:"", email:"", mychannel:"", agree:false, comments:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])


        // FeedbackController
        // ------------------------------------------------------------
        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {             
                    var fb = new feedbackFactory($scope.feedback);
                    fb.$save();
     
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {firstName:"", lastName:"", email:"", mychannel:"", agree:false, comments:"" };
                    $scope.feedback.mychannel="";
                    
                    $scope.feedbackForm.$setPristine();
                    
                    console.log($scope.feedback);
                    
                    
                }
            };
        }])


        // DishDetailController
        // ------------------------------------------------------------------------------------------------------------------------
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            // Handling Errors in Client-Server Communication
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
        }])


        // DishCommentController
        // ------------------------------------------------------------------------------------------
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);
                
                $scope.dish.comments.push($scope.comment);
                
                // Submit the user's comments about a dish to the server.
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.comment = {rating:5, comment:"", author:"", date:""};
            }

        }])

        // IndexController
        // ---------------------------------------------------------------------------------------------------------------------------
        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {
            
            // Featured Dish
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";

            $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                    console.log($scope.dish);
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            // Featured Promotion
            $scope.promotion = {};
            $scope.showPromotion = false;
            $scope.promotion = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                    console.log($scope.promotion);
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            // Featured Executive Chef
            $scope.leadership = {};
            $scope.showLeadership= false;
            $scope.leadership = corporateFactory.getLeader().get({id:3})
            .$promise.then(
                function(response){
                    $scope.leadership = response;
                    $scope.showLeadership = true;
                    console.log($scope.leadership);
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
        }])
         

        // AboutController
        // -----------------------------------------------------------------------------------------------
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            // Load Executive Leadership for About Us template
            $scope.showLeaders = false;
            $scope.message="Loading ...";
            corporateFactory.getLeaders().query(
                function(response){
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                    console.log($scope.leaders);
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
        }])
                                        

;
