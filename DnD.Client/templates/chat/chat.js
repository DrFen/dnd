app.directive('chat', function (dataService, $timeout, $rootScope) {
    return {
        templateUrl: '/templates/chat/chat.html',
        scope: {
            UserId : "=id",
			UserName : "=name"           
        },
        controller: function ($scope) {
			$scope.$on('newChatMessage', function(event, chatId, chatTitle, message) { 
				var chatFind = false;
				
				if(!$scope.userChats)
					return;
					
				if(!chatId)
					return;
					
				for(var i=0; i<$scope.userChats.length; i++){
					if($scope.userChats[i].ChatId === chatId){	
						if(message){
							$scope.userChats[i].Messages.push(message);	
						};
						chatFind = true;
						break;
					};					
				};
				
				if(!chatFind)
					$scope.userChats.push({
						ChatId: chatId,
						Title: chatTitle,
						Messages: message?[message]:[]
					});
					
					
				
				$timeout(function(){var objDiv = document.getElementById(chatId);
					if(!objDiv)
						return;
					objDiv.scrollTop = objDiv.scrollHeight;	}, 0);
			});

			document.onmousemove = function(e){
				$scope.cursorX = e.pageX;
				$scope.cursorY = e.pageY;
			}

        },
        link: function (scope, element, attrs) {
           
			scope.getUserChat = function(){
				var answer = [
				{
					ChatId: 'a1', 
					Title: 'First chat', 
					Messages: [
								{MessageId: 'm11', UserId: 'u1', UserName: 'user 1', MessageText: 'Hello', UserColor: '#00FFAD'},
								{MessageId: 'm12', UserId: 'u2', UserName: 'user 2', MessageText: 'Hi', UserColor: '#B911FF'},
								{MessageId: 'm13', UserId: 'u1', UserName: 'user 1', MessageText: 'How are u?', UserColor: '#00FFAD'},
								{MessageId: 'm14', UserId: 'u1', UserName: 'user 1', MessageText: 'umm?', UserColor: '#00FFAD'},
								{MessageId: 'm15', UserId: 'u2', UserName: 'user 2', MessageText: 'I`m fine', UserColor: '#B911FF'}
							  ]
								
				},
				{
					ChatId: 'a2', 
					Title: 'Second chat', 
					Messages: [
								{MessageId: 'm21', UserId: 'u1', UserName: 'user 1', MessageText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', UserColor: '#00FFAD'},
								{MessageId: 'm22', UserId: 'u2', UserName: 'user 2', MessageText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', UserColor: '#B911FF'},
								{MessageId: 'm23', UserId: 'u1', UserName: 'user 1', MessageText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse', UserColor: '#00FFAD'},
								{MessageId: 'm24', UserId: 'u1', UserName: 'user 1', MessageText: 'cillum dolore eu fugiat nulla pariatur.', UserColor: '#00FFAD'},
								{MessageId: 'm25', UserId: 'u2', UserName: 'user 2', MessageText: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', UserColor: '#B911FF'}
							  ]
								
				}
				
				];
				
				if(answer){
					if(answer.length>0){
						scope.activeChat =  answer[0].ChatId;
					}
				}
					
				
				return answer;
		    }
			
			scope.sendMessage = function(){
				if(!scope.messageText)
					return;
				
				if(scope.messageText.trim()==='')
					return;
					
				if(!scope.activeChat)
					return;	
				/*testing*/	
				console.log('sending to chat id=' + scope.activeChat + ' message = ' + scope.messageText);		
				$rootScope.$broadcast('newChatMessage', scope.activeChat, 'test',{MessageId: 'm251', 
				UserId: 'u2', 
				UserName: 'user 2', 
				MessageText: scope.messageText, 
				UserColor: '#B911FF'});
				/*!*/
				scope.messageText = '';
				
			};
			
			
			
			scope.userChats = scope.getUserChat();

			scope.changeChat = function(chatId){
					scope.showMenu = false;
					scope.activeChat=chatId; 
					$timeout(function(){var objDiv = document.getElementById(chatId);
					if(!objDiv)
						return;
					objDiv.scrollTop = objDiv.scrollHeight;	}, 0);
			}
			
			scope.onKeyPress = function(e){
				scope.showMenu = false;
				if(e.keyCode === 13)
					scope.sendMessage();
			}
			
			scope.userMenu = function(userId, userName){
				scope.showMenu = true;
				scope.xMenuPosition = scope.cursorX;
				scope.yMenuPosition = scope.cursorY;
				scope.userMenuUser = userId;
				scope.userMenuUserName = userName;
			}
			
			scope.createPrivateChannel = function(){			
				scope.showMenu = false;
				
				if(!scope.userMenuUser )
					return;
					
				/*testing*/	
				console.log('creating private chat with userId= ' +  scope.userMenuUser);		
				$rootScope.$broadcast('newChatMessage', 'a' + Math.round(1000+ Math.random() * (10000000000000- 1000)), 'PC with User2', null);
				/*!*/	
				
			};
			
			scope.refer = function(){
				scope.messageText = (scope.messageText?scope.messageText:'') + scope.userMenuUserName + ', ';
				scope.showMenu = false;
				document.getElementById("chat-input-text").focus();
			};
			
			scope.deleteUser = function(){
				scope.showMenu = false;
			};
			
			scope.isMessageForMe = function(messageText){
				return messageText.toLowerCase().indexOf(scope.UserName.toLowerCase())!==(-1);
			}
						
        }

    }

});