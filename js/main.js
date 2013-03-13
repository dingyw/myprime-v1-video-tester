function Main($scope, $http, $templateCache) {
	$scope.videoId = '';
	$scope.closedCaption = '';
	$scope.lessons
	$scope.brightcoveElems
	$scope.currentVideoId
	$scope.currentClosedCaption

	$scope.code = null;
	$scope.response = null;

	$http({
		method : 'GET',
		url : 'xml/lessons.xml',
		cache : $templateCache
	}).success(function(data, status) {
		$scope.status = status;
		$scope.data = data;
		console.log("Success loading Main XML");

		var xmlDoc = $.parseXML($scope.data);
		$scope.$xml = $(xmlDoc);
		var $lesson = $scope.$xml.find('unit#1 lesson');
		for (var i = 0; i < $lesson.length; i++) {
		}

	}).error(function(data, status) {
		$scope.data = data || "Request failed";
		$scope.status = status;
	});

	$scope.updateUnitId = function() {
		console.log("Update unit ID :: " + $scope.unitId);

		// Clear the lesson
		$scope.lessons = [];

		var $lesson = $scope.$xml.find('unit#' + $scope.unitId + ' lesson');

		for (var i = 0; i < $lesson.length; i++) {
			var lessonSrc = $($lesson[i]).attr('src');
			var lessonSrc = $($lesson[i]).attr('src');
			$scope.lessons.push({
				text : lessonSrc,
				src : lessonSrc,
				num : i
			});
		}
	};

	$scope.updateLessonSrc = function() {
		console.log("Update Lesson Src :: " + $scope.lessonSrc);

		// Clear out old data.
		$scope.brightcoveElems = [];

		$scope.code = null;
		$scope.response = null;
		$http({
			method : 'GET',
			// url : $scope.lessonSrc,			url : '../../../../DVD/Myprime_adapt_course/myPRIME/data/Unit_1/Unit001_Lesson001_Topic000.xml',			cache : $templateCache
		}).success(function(data, status) {
			console.log("Success loading lesson XML");

			var xmlDoc = $.parseXML(data);
			var $xml = $(xmlDoc);
			var $brightcoveElems = $xml.find('brightcoveVideo');

			for (var i = 0; i < $brightcoveElems.length; i++) {
				var videoName = $($brightcoveElems[i]).attr('name');
				var videoId = $($brightcoveElems[i]).attr('source');				var videoLabel = $($brightcoveElems[i]).attr('label');				var captionElem = $($brightcoveElems[i]).find('caption');				var captionSrc = $(captionElem).attr('source');
				console.log(videoName);
				$scope.brightcoveElems.push({
					name : videoName,
					id : videoId,
					captionSrc : captionSrc
				});			}

		}).error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	}

	$scope.updateVideo = function() {
		console.log("Update Video :: " + $scope.videoData);
		var videoArray = $scope.videoData.split(',');

		player = flowplayer("player", "flowplayer/flowplayer-3.2.16.swf", {
			clip : {
				url : 'video/' + videoArray[0] + '.f4v',

				// this is the Timed Text file with captions info
				// captionUrl : "../../../../DVD/Myprime_adapt_course/myPRIME/data/Unit_1/captions/lesson_00/U1L0C2_cc.xml"
				captionUrl : videoArray[1]
			},
			plugins : {

				captions : {
					url : "flowplayer/flowplayer.captions-3.2.9.swf",

					// pointer to a content plugin (see below)
					captionTarget : 'content'
				},

				// configure a content plugin to look good for our purpose
				content : {
					url : "flowplayer/flowplayer.content-3.2.8.swf",
					bottom : 25,
					width : '100%',
					height : 40,
					backgroundColor : 'transparent',
					backgroundGradient : 'high',
					borderRadius : 4,
					border : 0,

					style : {
						'body' : {
							fontSize : '14',
							fontFamily : 'Arial',
							textAlign : 'center',
							color : '#ffffff'
						}
					}
				}
			}
		});

	};
}
