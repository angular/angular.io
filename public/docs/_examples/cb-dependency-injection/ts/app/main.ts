import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {TriangleComponent} from './triangle.component';
import {SquareComponent} from './square.component';
import {CanvasComponent} from './canvas.component';
import {ShapesComponent} from './shapes.component';
import {MessageEncoderComponent} from './message-encoder.component';
import {PaintComponent} from './paint.component';
import {EnigmaComponent} from './enigma.component';
import {ThemedAppComponent} from './themed-app.component';
import {EllipseCanvasComponent} from './ellipse-canvas.component';

@Component({
  selector: 'app',
  templateUrl: 'app/app.html',
  directives: [
    TriangleComponent,
    SquareComponent,
    CanvasComponent,
    ShapesComponent,
    MessageEncoderComponent,
    PaintComponent,
    EnigmaComponent,
    ThemedAppComponent,
    EllipseCanvasComponent
  ]
})
class AppComponent {
}

bootstrap(AppComponent);