# Securing Content
Application security is a big, rich topic. 
In this chapter we focus on an important part of the security story: 
ensuring the safety and security of the **content we display** and the **user input we accept**.

l-sub-section
  :marked
    This document covers the Angular features and techniques related to the security of application content. 
    It does not cover authentication (_Who is this user?_) or authorization (_What can this user do?_).


>Brian: Martin's document follows with some editing by me. Be sure to look at the 
[original Google doc](https://docs.google.com/document/d/1l7x9HCEl0mbv7r5yQqQY6EqxWmkKUfgycn4hK0agA2M/) 
for the comments on the side

>Please borrow langauge and ideas from https://docs.angularjs.org/guide/security

## Follow Industry Security Standards

We should continually refresh our knowledge and awareness of security best practices.
[the OWASP Guide Project](https://www.owasp.org/index.php/Category:OWASP_Guide_Project) is an excellent resource
with content and links to many important security topics.

## Report Angular Security Issues

Email us at [security@angularjs.org](mailto:security@angularjs.org) to report all potential security issues in Angular itself.

For further details on how Google handles security issues please refer to [Google's security philosophy](https://www.google.com/about/appsecurity/).

## Best Practices (High Level)

* **Keep Angular up to date with the latest releases.** 
The latest releases often patch security defects in previous version. 
Check the Angular [change log](https://github.com/angular/angular/blob/master/CHANGELOG.md) frequently for security update information.

* **Don't modify your copy of Angular.** Private, customized versions of Angular tend to fall behind the current version and may miss important changes with significant security improvements.
Share your changes with the community. Make a pull request.

* **Use the offline template compiler for production deployments.** This will allow you to avoid template injection vulnerabilities, but will also improve your overall binary size. **Do not dynamically generate templates.**

* **Avoid using Angular APIs marked as “Security Risk”** in the documentation as best as possible. These should only be used for extenuating circumstances in which your application requires their use.

* **Do not interact with the native DOM** as it’s very dangerous and presents great potential for creating security risks within your application.

* **Use a secure, automatically escaping, template language** on the server side for the initial page load. While this is unrelated to Angular, it is another vector often used for Cross-site scripting (XSS) attacks and can undermine the security features built into Angular.

* **Use a strict Content Security Policy (CSP)** to provide an increased level of security for your application. A Content Security Policy is a defense in depth technique that will help identify and prevent various security risks within your web application.

## Cross-site Scripting (XSS)

[Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) is one of the top vulnerabilities found within web applications and has been for quite a long time. This vulnerability allows attackers to insert their own code into web applications that is evaluated as if it were part of the system code. The risk of having this type of vulnerability is that it allows extraction of sensitive information that can compromise your users and/or system as a whole.

Are you not fully convinced this is a serious enough risk yet? Let's imagine you have some sort of means to identify the user currently signed into your application and that this is accomplished with a token stored in the browser's session storage (sound familiar?). Let's say there is a cross-site scripting vulnerability present on a very frequented page within your web application. This would allow an attacker to inject a script in that page that is reading and **extracting every users' security token**. The attacker could also have the script send that information in a request to their own server that stores it for the attacker to leverage even further. Once the attacker has this information, they can place that token in their own session storage while visiting your site and be signed in on behalf of another user.

This is just one example of the potential attacks that are made possible through cross-site scripting vulnerabilities and does not fully encompass the various dangers they pose. It is crucial to protect our web applications from cross-site scripting in order to prevent such risks. Angular's security model is aimed to assist in protecting from this type of vulnerability so that you may begin down the right path towards building a secure web application.

### Angular’s Cross-site Scripting Security Model

In order to assist in preventing cross-site scripting, Angular will automatically sanitize values that are interpolated in templates and expressions. This means that when a user enters _data_ into Angular that is intended to be viewable in HTML it will check for "keys" within that data that are known to present cross-site scripting vulnerabilities and **remove** them from the data. 
An example of such "keys" is `<script>` which, if included in the HTML to be rendered, 
the browser would interpret it as an actual script and execute whatever is present in the remainder 
of the user provided data.

Due to the built-in sanitization security feature within Angular it is best that all DOM interaction happen through template bindings, for both convenience and safety.

Templates and Angular expressions are considered as code in Angular and therefore it is a best practice for them to be static. You should never generate templates on the fly within Angular in the client as this presents an opportunity for an attacker to find a cross-site scripting vulnerability by concatenating their data into a template. If you need to generate templates more dynamically it is best to do that server side where you have full control over the input into that template. This can be accomplished through the offline template compiler which will protect you from accidental template injection. The added benefit of using the offline template compiler is it will reduce the size of your Angular application.
> [WB: I don't know precisely what he means. We should support data/model driven forms. 
I think he wants to avoid reading in HTML templates on the fly.
Let's clarify.]

> In Angular 1 there was a sandbox for which template expressions were running in. This was never a security boundary and has been completely removed in Angular 2.

### *bypassSecurityTrust* APIs

#### Warning

The built in security within Angular that handles sanitization for template and expression binding should not be bypassed as it is properly handling these inputs for you. Although Angular provides a means to bypass these features through the `bypassSecurityTrust*` methods you should avoid using them as best as possible. As a best practice you should **avoid** any use of these methods.

#### Using the *bypassSecurityTrust* APIs

In the rare case where there is a need to disable Angular's automatic input sanitization. This is accomplished through the `bypassSecurityTrust*` methods within the `DomSanitizationService`. This service provides the following methods which have specific sanitization purposes:

* `bypassSecurityTrustHtml`: sanitizes input that is to be used within the context of HTML
* `bypassSecurityTrustScript`: sanitizes input that is to be used within the context of JavaScript
* `bypassSecurityTrustStyle`: sanitizes input that is to be used within the context of styles (input values used in CSS)
* `bypassSecurityTrustUrl`: sanitizes input that is to be used within the context of URLs (input values used in hyperlinks)
* `bypassSecurityTrustResourceUrl`: sanitizes input that is to be used within the context of Resource URLs (input values used for locations from which to load executable code)

Access to these methods require you to inject the `DomSanitizationService` into your component and then leverage the correct `bypassSecurityTrust*` method for the corresponding context the input is to be used in.

**If you absolutely must use any of these methods be sure to call it as early as possible so that it is easier to verify the legitimacy of the value passed in and that it is trustworthy for use within its intended context.**

An example use case of when you would potentially use one of these methods is when using an HTML template that must contain a script (`<script></script>`) embedded inside it. In this scenario you would leverage the `bypassSecurityTrustHtml` method so that the sanitization process does not remove the needed script contained within the template.

Another example use case would be if your web application had unique sanitization needs for which you use your own sanitizer service. In that case you could disable the corresponding Angular sanitizing method and replace it with your own.

[Ward: Give examples. My use case: you offer a text area that allows limited HTML formatting such as `<i>` and `<b>` and other styles.]

[Ward: be on the look out for `<script>` tags? Brian ... when would YOU need this and how would you use it safely?]

[Brian: Left Ward's notes for later reference. **Ward...** one scenario I could see when someone might use this is if the built-in Angular one does not suffice for the level of scrutiny a certain web application needs. Maybe there's more potentially risky content specific to this particular business and they've built their own sanitization library to handle this for them. It would require they have their own service which wraps that particular library and is used for EVERY instance where they are binding dynamic data to something in HTML. It might be useful to have functionality within Angular to allow for custom services to be injected as the underlying sanitizer within the framework. I think this could remove any scenarios where someone would say "I'm not using Angular because it's not secure enough for me." The response to that will be "well they allow you to build upon their security features so you can make it secure enough for you." Plus we've seen this before with other frameworks like .NET and data validation attributes. Thoughts?]

### Beware of *ElementRef* and *DomRenderer* Services

Angular allows lower level access to the native DOM through APIs such as `ElementRef` and `DomRenderer`. These APIs must be used with great caution as they could create potential security risks if used carelessly. These risks are particularly present when manipulating the DOM within these APIs with user provided input. In such cases it is important to avoid this as best as possible. When this is still not possible to be avoided you should properly sanitize the user input according to the context it will be used in. You can sanitize this input by injecting the [`DomSanitizationService`](https://angular.io/docs/ts/latest/api/platform-browser/index/DomSanitizationService-class.html) and using the [`sanitize`](https://angular.io/docs/ts/latest/api/platform-browser/index/DomSanitizationService-class.html#!#sanitize-anchor) method.

Let's take the example from the [Attribute Directives chapter](https://angular.io/docs/ts/latest/guide/attribute-directives.html). In that chapter you use the following code for the highlight directive in `hightlight.directive.ts`:

```javascript
import { Directive, ElementRef, Input } from '@angular/core';
@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
  private _defaultColor = 'red';
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }
  
  @Input('myHighlight') highlightColor: string;
  
  onMouseEnter() { this.highlight(this.highlightColor || this._defaultColor); }
  onMouseLeave() { this.highlight(null); }
  
  private highlight(color:string) {
    this.el.style.backgroundColor = color;
  }
}
```

Instead of binding the element's `backgroundColor` to an unsanitized input value, we can make this more secure using the [`DomSanitizationService`](https://angular.io/docs/ts/latest/api/platform-browser/index/DomSanitizationService-class.html).

```javascript
import { Directive, ElementRef, Input, DomSanitizationService } from '@angular/core';
@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
  private _defaultColor = 'red';
  private el: HTMLElement;
  private dss: DomSanitizationService;

  constructor(el: ElementRef, dss:DomSanitizationService) { 
  	this.el = el.nativeElement;
  	this.dss = dss;
  }
  
  @Input('myHighlight') highlightColor: string;
  
  onMouseEnter() { this.highlight(this.highlightColor || this._defaultColor); }
  onMouseLeave() { this.highlight(null); }
  
  private highlight(color:string) {
  	var sanitizedColor = dss.sanitize(SecurityContext.STYLE, color);
    this.el.style.backgroundColor = sanitizedColor;
  }
}
```

[Ward: in fact ... we teach their use in the "Attribute Directives" chapter!  
That's how we write directives that style the DOM. They are hard to avoid completely.]

[Ward: because you can easily take user input or data retrieved from a compromised remote service and 
accidentally inject that data into the DOM. Show examples of danger and what not to do].
Suggest finding a solution using regular template binding instead of using these dangerous APIs

### Security Code Review
Good practice to ensure there's a high level of security within your web applications is to do regular security code reviews just as you would for any other code review. When doing a security code review for Angular you should be on the lookout for use of any of the `bypassSecurityTrust` API's as this is a **red flag**. You should also take note of any methods with `ElementRef` and `DomRenderer` type annotations as they are **red flags** as well.

This type of security screening should be done often and with automation as best as possible. Doing so will catch these type of red flags early and often therefore preventing introduction of unknown risks within your web application. Whenever there are occurencies of such red flags it is best practice to document them especially if they result in their use being authorized. If their use is authorized the documentation should indicate the justification for it and identify the contacts who came to the decision.

## HTTP
Keeping communication over HTTP secure requires some cooperation between your server and the client. Angular assists with this effort by providing built-in strategies that support the common techniques for securing this communication. The absence of these features and the lack of their use can result in exposing your web application to Cross-site Request Forgery (CSRF) and Cross-site Script Inclusion (XSSI) vulnerabilities.

In order for Angular to work with the common protection techniques against such attacks there must be server-side implementations of CSRF and XSSI mitigations.

### Cross-site Request Forgery (CSRF or XSRF)
Cross-site request forgery is a vulnerability that allows and attacker to essentially recreate requests for your server, but from their own web application. The risk associated to this vulnerability is that, if present, authenticated users of your web application can be tricked into visiting the attacker's web application which will then perform such requests that the user never intended to perform. 

As an example imagine you have a form on your site the will allow a logged in user to transfer money from their account to another known account. This form requires the user to be authenticated and provide the values to the fields in the form for the user's account number and the account number for which the money should be transfered. Using the CSRF vulnerability, an attacker can recreate this same form, but use their own account number as the value in the form to receive the money. They will hide this form from the user's view and trick them into visiting their site containing the hidden form which is submitted upon opening. Unbeknown to the user, they just transfered money from their account to the attacker's account.

One of the ways we can prevent this vulnerability is by using a technique called double submit. The way this protection works is it requires the attacker to provide a unique token as part of every request that involves sensitive operations. The mechanism for creating a unique token value comes from your server which sends a cookie to the client browser containing the value. That cookie can only be read by JavaScript in your web application and is not accessible from an attacker's web application.

Angular makes the implementation of this protection a bit easier through its `Http` service. The `Http` service will automatically recognize when that cookie exists and include the value of that as part of the HTTP headers sent in the requests to your server. The default cookie name the `Http` service looks for is `XSRF-TOKEN` as that is the industry standard, but this is also configurable should you choose to use a different name. The header name that the `Http` service uses to provide the cookie value as part of the request is `X-XSRF-TOKEN`. Again, this is also configurable should you require this to be a different name.

More details can be found at the Open Web Application Security Project (OWASP) on [Cross-site request forgery](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)) and [Double-submit mitigation](https://www.owasp.org/index.php/CSRF_Prevention_Cheat_Sheet#Double_Submit_Cookie).

>See https://github.com/angular/http/issues/91

### Cross-site Script Inclusion (XSSI)
Cross-site script inclusion is a vulnerability around referencing scripts used in your web applicationfrom another domain. When making such references it is possible that these scripts have access to sensitive information pertaining to your web application or your users. An attacker could then reference those same scripts within their web application to gain access to that sensitive information. One way of preventing such vulnerabilities is done through prefixing responses for those scripts with text that prevents an attacker's application from being able to execute them. The reason this works is because your web application is in the same domain context as the script and is capable of reading the script content. Whereas an attacker's web application can only reference the script within it. The script prefix used for preventing evaluation is `")]}',\n"`.

Angular’s `Http` service will automatically remove the `XSSI` prefix `")]}',\n"` from server responses to allow for `XSSI` protection. This is done at runtime when retrieving the various script resources needed for running your Angular web application.

### Content Security Policy (CSP)
As mentioned earlier, a Content Security Policy is a defense in depth technique that will help identify and prevent various security vulnerabilities within your web application. The primary vulnerability it helps prevent, among others, is Cross-site Scripting. It works by blocking all in-line styles and scripts forcing them to be abstracted into their own separate files and referenced directly instead. This makes it more difficult for attackers to inject their own arbitrary code through areas within your application that are vulnerable to XSS. 

The policy is provided as an HTTP header called `Content-Security-Policy` and essentially creates a contract between your server and the browser. The browser is responsible for honoring the instructions defined in the policy. The policy provides various directives for defining the permitted origin locations of each resource type you reference within your application. These resource types are things such as script files, images, fonts, style sheets, etc. and each is defined through their own corresponding directive. If one is not defined in a directive explicitly the browser will fallback to the `default-src` directive within the policy header.

When using this with Angular, you will want to define the permitted origin locations for loading the resources relevant to your web application. Typically this would be at least for your JavaScript files (`script-src` directive), stylesheet files (`style-src` directive) and where you will be making AJAX requests (`connect-src` directive). However, you should not stop there, but rather you should be as explicit as possible for _all_ of your resource types as it is best practice to implement a strict CSP.

TODO: fill in details for enabling support within Angular so that it does not violate the CSP standard

More information can be found on the Content Security Policy standard at [Wikipedia](https://en.wikipedia.org/wiki/Content_Security_Policy) and [OWASP](https://www.owasp.org/index.php/Content_Security_Policy).

### Local Caches
Local Caches (but adjust for new A2 API names where applicable)
There are various places that the browser can store (or cache) data. Within Angular there are objects created by the $cacheFactory [Brian: is there an equivalent in A2? `CACHE_TEMPLATE_PROVIDER`?]. These objects, such as $templateCache [Brian: `CACHE_TEMPLATE_PROVIDER` as well?] are used to store and retrieve data, primarily used by the `Http` service and the script directive to cache templates and other data.

Similarly the browser itself offers localStorage and sessionStorage objects for caching data.

Attackers with local access can retrieve sensitive data from this cache even when users are not authenticated. For instance in a long running Single Page Application (SPA), one user may "log out", but then another user may access the application without refreshing, in which case all the cached data is still available.

For more information please visit [Web Storage Security](https://www.whitehatsec.com/blog/web-storage-security/).

### HTTPS
While this is not directly related to Angular it is important to implement the use of HTTPS within your web application. Conducting your application's actions over the network using HTTP alone puts both your users and application at risk. HTTP traffic is susceptible to what is called Man in the Middle attacks. These attacks involve an attacker sitting on the network listening to traffic between your client and the server. When the traffic is using only HTTP, it makes the attackers job extremely easy to find sensitive information being passed over the network and using it maliciously. It is highly recommended that you use proper Transport Layer Security (TLS) to secure the network traffic between your clients and servers. More information on this can be found at [Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security) and [Let's Encrypt](https://letsencrypt.org/).
 
