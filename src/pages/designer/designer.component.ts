import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, SimpleChange, KeyValueChangeRecord } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Style } from '../../models/style';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html'
})
export class DesignerComponent {

  // Custom Data id attribute
  // Each control need a unique ID
  DATA_DATEX_ID: string = "data-datex-id";

  // Reference to the canvas container
  @ViewChild('canvas') canvas: ElementRef;

  // All children of the canvas (only last elements)
  canvasChildren: Array<HTMLElement> = [];

  //style map between element and style
  elementStyleMap: Map<string, Style> = new Map<string, Style>();
  // elementStyleMap = {}

  // style for the current selected element
  currentStyle: Style = new Style();
  currentSelectedElement: Element;

  constructor(private render: Renderer2, private http: HttpClient) {

  }

  ngAfterViewInit() {
    // mimic the template coming from server
    //this.http.get("./assets/template.json").toPromise().then((template: any)=> {
    this.http.get("http://localhost:3000/api/app/").toPromise().then((template : any)=> {
      console.log(template);

      // inject the html into the canvas
      this.render.setProperty(this.canvas.nativeElement, 'innerHTML', template.template);

      // find all children under the canvas
      this.findAllChildren(this.canvas.nativeElement);

      // add behaviour to the children
      this.initChildElements();
    })
    .catch(err => {
      console.log(err);
    })
  }

  ngOnDestroy() {
    // need to unlisten
  }

  findAllChildren(element) {
    if (element.children.length == 0) {
      this.canvasChildren.push(element);
    }
    else {
      let children = element.children;
      for (let i = 0; i < children.length; i++) {
        this.findAllChildren(children[i]);
      }
    }
  }

  initChildElements() {
    this.canvasChildren.forEach(element => {

      // Add an ID if missing
      let id = element.getAttribute(this.DATA_DATEX_ID);
      if (id === null) {
        id = uuid();
        this.render.setAttribute(element, this.DATA_DATEX_ID, id);
      }

      // Create a style for that element
      this.elementStyleMap.set(id, new Style());

      // Add click event handler for select
      this.render.listen(element, 'click', this.onClick.bind(this));

      // Add draggable class
      this.render.addClass(element, 'draggable');

    });
  }

  onClick(ev) {
    console.log('click');
    let element = ev.srcElement;
    this.canvasChildren.forEach(element => {
      this.render.removeClass(element, "selected");
    })
    this.render.addClass(ev.srcElement, "selected");


    let elementId = ev.srcElement.attributes[this.DATA_DATEX_ID].nodeValue;
    let style = this.elementStyleMap.get(elementId);

    this.currentStyle = style;
    this.currentSelectedElement = ev.srcElement;
  }

  onStyleChange(styleChangeInfo) {
    console.log(styleChangeInfo);

    this.render.setStyle(this.currentSelectedElement, styleChangeInfo.key, styleChangeInfo.currentValue);
  }


  onBuild() {
    let html = this.canvas.nativeElement.innerHTML;
    console.log(html);

    let body = {
      template: html
    }
    this.http.post("http://localhost:3000/api/app/build/", body).toPromise()
    .then((resp) => {
      console.log("build resp", resp);
    })
    .catch(err => {
      console.log("build err", err);
    })
  }
}
