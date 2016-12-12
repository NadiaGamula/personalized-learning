define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (spec, isMultiple, background, spots) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, spec, _protected);

        that.isMultiple = isMultiple;
        that.background = background;
        that.spots = spots;
        that.placedMarks = [];
        var placedMarks = null;
        function answer(marks) {
            placedMarks = marks;
            if (!_.isArray(that.spots) || that.spots.length == 0) {
                that.score = 100;
                return;
            }

            if (!_.isArray(marks)) {
                that.score = 0;
                return;
            }

            var answerCorrect;
            if (isMultiple) {

                var spotsWithMarks = [];
                var marksOnSpots = [];

                _.each(marks, function (mark) {
                    _.each(that.spots, function (spot) {
                        if (isMarkInSpot(mark, spot)) {
                            spotsWithMarks.push(spot);
                            marksOnSpots.push(mark);
                        }
                    });
                });

                answerCorrect = _.uniq(spotsWithMarks).length === that.spots.length && _.uniq(marksOnSpots).length === marks.length;

            } else {
                answerCorrect = _.some(that.spots, function (spot) {
                    return _.some(marks, function (mark) {
                        return isMarkInSpot(mark, spot);
                    });
                });
            }

            that.score = answerCorrect ? 100 : 0;
        };
        function restoreProgress(progress) {
            _.each(progress.marks, function (mark) {
                that.placedMarks.push(mark);
            });
            if (progress.score) {
                that.score = 100;
            } 
        }
        function getProgress() {
            if (this.score == 100) {
                return {
                    marks: placedMarks,
                    score: 100
                };
            } else {
                return {
                    marks: placedMarks
                }
            }
        }
    };

    return ctor;


    function isMarkInSpot(mark, spot) {
        var x = mark.x, y = mark.y;

        var inside = false;
        for (var i = 0, j = spot.length - 1; i < spot.length; j = i++) {
            var xi = spot[i].x, yi = spot[i].y;
            var xj = spot[j].x, yj = spot[j].y;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

})