define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (spec, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };
        var submittedAnswers = null;
        Question.call(that, spec, _protected);

        that.answers = answers;

        function answer(userAnswers) {
            submittedAnswers = userAnswers;
            var hasMistakes = _.some(userAnswers, function (answer) {
                return !_.some(that.answers, function (option) {
                    return option.groupId.toLowerCase() === answer.groupId.toLowerCase() &&
                        (option.matchCase ? option.text === answer.text : option.text.toLowerCase() === answer.text.toLowerCase());
                });
            });

            that.score = hasMistakes ? 0 : 100;
        };
        function restoreProgress(progress) {
            if (progress === 100) {
                that.score = 100;
                _.each(that.answers, function (answer) {
                    answer.submittedAnswer = answer.text;

                });
            }
            else {
                _.each(that.answers, function (answer) {
                    var answered = _.find(progress, function(progressItem) {
                        return answer.groupId === progressItem.groupId;
                    });

                    if (!_.isNull(answered) && !_.isUndefined(answered) && answered.text) {
                        answer.submittedAnswer = answered.text;
                    }
                });
            }
        }

        function getProgress() {
            if (that.score == 100) {
                return 100;
            }
            return submittedAnswers;
        }
    };

    return ctor;

})