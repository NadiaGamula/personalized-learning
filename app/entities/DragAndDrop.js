define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (spec, background, dropspots) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, spec, _protected);

        that.background = background;
        that.dropspots = dropspots;
        var masteredSpots = null;

        function answer(answers) {
            var correct = 0;
            masteredSpots = answers;
            _.each(answers, function (answer) {
                if (_.find(that.dropspots, function (dropspot) {
                    return dropspot.id == answer.id && dropspot.x == answer.x && dropspot.y == answer.y;
                })) {
                    correct++;
                };
            });

            that.score = correct == that.dropspots.length ? 100 : 0;
        };

        function restoreProgress(progress) {
            _.each(that.dropspots, function (spot) {
                spot.placed = _.find(progress.masteredSpots, function(masteredSpot) {
                     return masteredSpot.x === spot.x && masteredSpot.y === spot.y;
                });
            });

            if (progress.score) {
                that.score = 100;
            }

        }
        function getProgress() {
            var obj = { masteredSpots: masteredSpots }
            if (that.score == 100) {
                obj.score = 100;
            }
            return obj;
        }
    };

    return ctor;
})