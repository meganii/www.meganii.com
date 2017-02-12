'use strict';

// textlint and rules

var _textlint = require('textlint');

var _textlintRuleJaYahooKousei = require('textlint-rule-ja-yahoo-kousei');

var _textlintRuleJaYahooKousei2 = _interopRequireDefault(_textlintRuleJaYahooKousei);

var _textlintRuleMaxAppearenceCountOfWords = require('textlint-rule-max-appearence-count-of-words');

var _textlintRuleMaxAppearenceCountOfWords2 = _interopRequireDefault(_textlintRuleMaxAppearenceCountOfWords);

var _textlintRuleMaxLengthOfTitle = require('textlint-rule-max-length-of-title');

var _textlintRuleMaxLengthOfTitle2 = _interopRequireDefault(_textlintRuleMaxLengthOfTitle);

var _textlintRuleNgWord = require('textlint-rule-ng-word');

var _textlintRuleNgWord2 = _interopRequireDefault(_textlintRuleNgWord);

var _appearenceCountOfWords = require('../ruleConfig/appearenceCountOfWords.json');

var _appearenceCountOfWords2 = _interopRequireDefault(_appearenceCountOfWords);

var _maxLengthOfTitle = require('../ruleConfig/maxLengthOfTitle.json');

var _maxLengthOfTitle2 = _interopRequireDefault(_maxLengthOfTitle);

var _ngWord = require('../ruleConfig/ngWord.json');

var _ngWord2 = _interopRequireDefault(_ngWord);

var _lodash = require('lodash');

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textlint = new _textlint.TextLintCore();

// rule config

textlint.setupRules({
  'ja-yahoo-kousei': _textlintRuleJaYahooKousei2.default,
  'max-appearence-count-of-words': _textlintRuleMaxAppearenceCountOfWords2.default,
  'max-length-of-title': _textlintRuleMaxLengthOfTitle2.default,
  'ng-word': _textlintRuleNgWord2.default
}, {
  'max-appearence-count-of-words': _appearenceCountOfWords2.default,
  'max-length-of-title': _maxLengthOfTitle2.default,
  'ng-word': _ngWord2.default
});

var githubAPI = new _github2.default({
  version: "3.0.0",
  debug: true,
  protocol: "https"
});
githubAPI.authenticate({
  type: "oauth",
  token: process.env.GITHUB_API_KEY
});

// ignore NOT PullRequest
if (!process.env.CI_PULL_REQUEST) process.exit();

// initialize
var match = process.env.CI_PULL_REQUEST.match(/\d+$/);
var PR_NUMBER = match[0];

var ghSetting = {
  user: process.env.GITHUB_USERNAME,
  repo: process.env.CIRCLE_PROJECT_REPONAME,
  number: PR_NUMBER
};

// run
function getChangedText() {
  return new Promise(function (resolve, reject) {
    githubAPI.pullRequests.getFiles(ghSetting, function (error, data) {
      if (error) return reject(error);

      var file = (0, _lodash.find)(data, function (f) {
        return f.filename.indexOf('.md') !== -1;
      });

      if (!file) return reject(new Error('file not found'));

      githubAPI.repos.getContent((0, _lodash.assign)({}, ghSetting, {
        ref: process.env.CIRCLE_SHA1,
        path: file.filename
      }), function (error, data) {
        if (error) return reject(error);

        var buffer = new Buffer(data.content, data.encoding);
        resolve(buffer.toString());
      });
    });
  });
}

function postComment(text) {
  return new Promise(function (resolve, reject) {
    githubAPI.issues.createComment((0, _lodash.assign)({}, ghSetting, { body: text }), function (error, data) {
      if (error) console.log(error);
      // DO NOTHING
    });
  });
}

getChangedText().then(function (text) {

  return textlint.lintMarkdown(text);
}).then(function (result) {

  var messages = (0, _lodash.reduce)(result.messages, function (sum, m) {
    return sum + '|' + m.message + '|\n';
  }, '');
  return postComment('|#|\n|---|\n' + messages);
}).then(function (__) {
  // ok
}).catch(function (error) {
  console.error(error);
});