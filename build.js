var fs = require('fs');
var handlebars = require('handlebars');
var reference = require('reference');

///
var file_JS = fs.readFileSync('./api_JS.json');
var file_iOS = fs.readFileSync('./api_iOS.json');
var file_Android = fs.readFileSync('./api_Android.json');

var JS_str = reference(file_JS, {anchor: true});

///replaceしないとJavaScript側で生成したhtmlのidと衝突する
var iOS_str = reference(file_iOS, {anchor: true});
iOS_str = iOS_str.replace(/ id="/g,' id="iOS-')
iOS_str = iOS_str.replace(/ id='/g," id='iOS-")
iOS_str = iOS_str.replace(/ href="#/g,' href="#iOS-');
iOS_str = iOS_str.replace(/ href='#/g," href='#iOS-");

var Android_str = reference(file_Android, {anchor: true});
Android_str = Android_str.replace(/ id="/g,' id="Android-');
Android_str = Android_str.replace(/ id='/g," id='Android-");
Android_str = Android_str.replace(/ href="#/g,' href="#Android-');
Android_str = Android_str.replace(/ href='#/g," href='#Android-");

///
var template_JS = fs.readFileSync('./template_JS.html', {encoding: 'utf8'});

var template_iOS = fs.readFileSync('./template_iOS.html', {encoding: 'utf8'});
template_iOS = template_iOS.replace(/ href="#/g,' href="#iOS-');
template_iOS = template_iOS.replace(/ href='#/g," href='#iOS-");

var template_Android = fs.readFileSync('./template_Android.html', {encoding: 'utf8'});
template_Android = template_Android.replace(/ href="#/g,' href="#Android-');
template_Android = template_Android.replace(/ href='#/g," href='#Android-");

var template_html = template_JS + template_iOS + template_Android;
template_html = fs.readFileSync('./header.html', {encoding: 'utf8'}) + template_html + fs.readFileSync('./footer.html', {encoding: 'utf8'});

var template = handlebars.compile(template_html);

///
fs.writeFile('./index.html', template({
	html_JS: JS_str,
	html_iOS: iOS_str,
	html_Android: Android_str,
}));
