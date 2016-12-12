define(['entities/Question'], function (Question) {

    var ctor = function (spec, answers, correctAnswerId) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, spec, _protected);

        that.answers = answers;
        that.correctAnswerId = correctAnswerId;
        var checkedAnswers = null;
        function answer(answerId) {
            that.score = answerId == that.correctAnswerId ? 100 : 0;
            checkedAnswers = answerId;
        };
        function restoreProgress(progress) {
            _.each(that.answers, function (answer) {
                answer.isChecked = false;
                if (answer.id === progress) {
                    answer.isChecked = true;
                }
                if (progress === 100 && answer.id === that.correctAnswerId) {
                    answer.isChecked = true;
                    that.score = 100;
                }
            });
        }

        function getProgress() {
            if (that.score === 100) {
                return 100;
            }
            else {
                return checkedAnswers;
            }
        }
    };

    return ctor;

})