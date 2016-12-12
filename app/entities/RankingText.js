define(['_', 'entities/Question'], function (_, Question) {

    var RankingText = function (spec, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, spec, _protected);

        that.correctOrder = _.map(answers, function (item) {
            return {
                text: item.text
            };
        });

        that.rankingItems = _.shuffle(that.correctOrder);

        function answer(items) {
            var pattern = _.pluck(that.correctOrder, 'text'),
                answered = _.pluck(items, 'text');

            that.score = _.isEqual(pattern, answered) ? 100 : 0;
        }

        function restoreProgress(progress) {
            if (progress === 100) {
                that.rankingItems = that.correctOrder;
                that.score = 100;
                return;
            }
            var pattern = _.pluck(that.correctOrder, 'text');
            if (pattern.length === progress.length
                && _.intersection(pattern, progress).length === pattern.length) {
                that.rankingItems = _.map(progress, function (item) {
                    return {
                        text: item
                    };
                });
            }
            
            that.score = 0;
        }
        function getProgress() {
            if (that.score == 100) {
                return 100;
            } else {
                return _.pluck(that.rankingItems, 'text');
            }
        }
    };

    return RankingText;

})