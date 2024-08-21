import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../_services/navigation.service';
@Directive({
  selector: '[Backbutton]'
})
export class BackbuttonDirective {

  constructor(private navigation: NavigationService) { }
  @HostListener('click')
  onClick(): void{
    this.navigation.back()
  }

}
