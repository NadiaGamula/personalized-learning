define(['knockout', 'durandal/app', 'durandal/activator', './studyadvice', './readings', 'entities/course'],
function (ko, app, activator, studyadvice, readings, course) {
    "use strict";

    var viewModel = {

        activeItem: activator.create(),

        activate: activate
    };


    app.on('studying:start-reading').then(function (sectionId, questionId) {
        viewModel.activeItem.activateItem(readings, [sectionId, questionId]);
    });

    app.on('studying:stop-reading').then(function () {
        viewModel.activeItem.activateItem(studyadvice);
    });

    return viewModel;

    function activate(sectionId, questionId) {
        if (sectionId && questionId && isQuestionInSection(sectionId, questionId)) {
            viewModel.activeItem.activateItem(readings, [sectionId, questionId]);
        }
        else {
            return viewModel.activeItem.activateItem(studyadvice);
        }
    }

    function isQuestionInSection(sectionId, questionId) {
        var section = _.find(course.sections, function (section) { return section.id === sectionId; });
        if (_.isNull(section) || _.isUndefined(section)) {
            return false;
        }
        var question = _.find(section.questions, function (question) { return question.id === questionId; });
        if (_.isNull(question) || _.isUndefined(question)) {
            return false;
        }
        return true;
    }
});