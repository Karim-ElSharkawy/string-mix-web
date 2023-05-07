import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'string-mix-web';
  firstString = 'mmmmm m nnnnn y&friend&Paul has heavy hats! &';
  secondString = 'my frie n d Joh n has ma n y ma n y frie n ds n&';
  resultString = '';

  constructor() {
    this.stringMix();
  }

  stringMix() {
    // function should find the maximum occurrences of a character in both strings
    // the result should be a mix of two strings separated by a slash '/' with the following rules:
    // 1. the first string should contain only lowercase letters from the first string
    // 2. the second string should contain only lowercase letters from the second string
    // 3. the letters should be sorted in descending order by the number of occurrences in the string
    // 4. in case of equal occurrence, the letters should be sorted alphabetically
    // 5. if a letter is present in both strings with the same occurrence, it should be presented with an '='

    let firstStringMap: any = {};
    let secondStringMap: any = {};
    // remove all spaces in string
    let firstString = this.firstString.replace(/\s/g, '');
    let secondString = this.secondString.replace(/\s/g, '');

    for (const element of firstString) {
      if (!this.isLowerCaseAndNotSpecial(element)) continue;

      if (element in firstStringMap) {
        firstStringMap[element]++;
      } else {
        firstStringMap[element] = 1;
      }
    }

    for (const element of secondString) {
      if (!this.isLowerCaseAndNotSpecial(element)) continue;

      if (element in secondStringMap) {
        secondStringMap[element]++;
      } else {
        secondStringMap[element] = 1;
      }
    }

    let firstStringKeys = Object.keys(firstStringMap);
    let secondStringKeys = Object.keys(secondStringMap);

    let resultCompilation = [];

    for (const element of firstStringKeys) {
      const firstElementValue = firstStringMap[element];
      if (secondStringKeys.includes(element)) {
        const secondElementValue = secondStringMap[element];

        if (firstElementValue < 2 && secondElementValue < 2) {
          continue;
        }

        if (firstElementValue > secondElementValue) {
          resultCompilation.push("1:" + element.repeat(firstStringMap[element]));
        } else if (firstElementValue < secondElementValue) {
          resultCompilation.push("2:" + element.repeat(secondStringMap[element]));
        } else {
          resultCompilation.push('=' + element.repeat(firstStringMap[element]));
        }
      } else {
        if (firstElementValue < 2) {
          continue;
        }

        resultCompilation.push("1:" + element.repeat(firstStringMap[element]));
      }
    }

    for (const element of secondStringKeys) {
      const secondElementValue = secondStringMap[element];

      if (secondElementValue < 2) {
        continue;
      }

      if (!firstStringKeys.includes(element)) {
        resultCompilation.push("2:" + element.repeat(secondStringMap[element]));
      }
    }

    resultCompilation.sort((a: string, b: string) => {
      if (a.length > b.length) {
        return -1;
      } else if (a.length < b.length) {
        return 1;
      } else {
        if (a[2] > b[2]) {
          return 1;
        } else if (a[2] < b[2]) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    this.resultString = resultCompilation.join("/");
  }

  isLowerCaseAndNotSpecial(str: string): boolean {
    return str === str.toLowerCase() && str.match(/[a-z]/i) != null;
  }
}
