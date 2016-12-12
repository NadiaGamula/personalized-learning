define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (spec, projectId, embedCode, masteryScore) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, spec, _protected);

        that.embedCode = embedCode;

        that.projectId = projectId;

        that.masteryScore = masteryScore;

        function answer(score) {
            that.score = score >= that.masteryScore ? 100 : 0;
        }

        function restoreProgress(progress) {
            if (!_.isNaN(progress)) {
                that.score = (progress === 100) ? progress : 0;
            }
        }

        function getProgress() {
            return that.score;
        }

    };

    return ctor;

})