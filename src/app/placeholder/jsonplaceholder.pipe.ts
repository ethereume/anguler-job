import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonplaceholder'
})
export class JsonplaceholderPipe implements PipeTransform {

  transform(value: String,howMuch:number): String {
    return  howMuch != -1 && value.length > howMuch ? value.slice(0,howMuch)+" ..." : value;
  }

}
