// #docplaster
// #docregion
import 'package:angular2/core.dart';

/// NOTE: this implementation is incomplete. Current content is provided
/// as a placeholder.
@Component(
    selector: 'bypass-security',
    templateUrl: 'bypass_security_component.html')
class BypassSecurityComponent {
  // DomSanitizationService sanitizer;
  String dangerousUrl;
  dynamic /*SafeUrl*/ trustedUrl;
  String dangerousVideoUrl;
  dynamic /*SafeResourceUrl*/ videoUrl;

  // #docregion trust-url
  BypassSecurityComponent(/*this.sanitizer*/) {
    // javascript: URLs are dangerous if attacker controlled.
    // Angular sanitizes them in data binding, but we can
    // explicitly tell Angular to trust this value:
    dangerousUrl = 'javascript:alert("Hi there")';
    trustedUrl = /*sanitizer.bypassSecurityTrustUrl*/('javascript:alert("Hi there")');
    // #enddocregion trust-url
    updateVideoUrl('PUBnlbjZFAI');
  }
  // #docregion trust-video-url
  void updateVideoUrl(String id) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data, so
    // that it's easier to check if the value is safe.
    dangerousVideoUrl = 'https://www.youtube.com/embed/$id';
    videoUrl = /*sanitizer.bypassSecurityTrustResourceUrl*/(dangerousVideoUrl);
  }
  // #enddocregion trust-video-url
}
