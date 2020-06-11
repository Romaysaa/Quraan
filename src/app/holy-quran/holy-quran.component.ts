import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuranPages} from "./QuranPages";
import {QuranInJson} from "./QuranInJson";


@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrls: ['./holy-quran.component.scss']
})
export class HolyQuranComponent implements OnInit {

  @Input() pageNumber: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();


  marginTop: number = 50;
  inputs: ({
    spans: ({ top: string; left: string; width: string; height: string })[];
    motashabehatSpans: { isRight: boolean; top: string; name: string }[];
    spansOfColoredWords: { top: string; left: string; width: string; color: string }[];
    isActive: boolean; href: string; activeAya: string
  })[] = [];
  isShiftedVertically: boolean = false;
  quranPageImage: String;
  arrOfAyaWords: string[];
  private searchWord: string;
  private x: {
    suraWithIndex: string,
    text: string,
    index: string,
    sura: string,
    lastWord?: String,
  }[] = [];
  motashabehatSpans: { isRight: boolean; top: string; name: string }[] = [];
  lastTopRight: number = 0;
  lastTopLeft: number = 0;
  isBorrow: boolean = false;
  spansOfColoredWords: { top: string; left: string; width: string; color: string }[];
  private allAyas: {
    aya: string,
    numOfCharsInWholeAya: number,
    ayaIndex: string,
    arrOfColoredWords: {
      word: string,
      color: string,
    }[],
    sura: string,
    suraWithIndex: string,
    mooade3: {
      suraWithIndex: string,
      aya: string,
    }[]
  }[] = [];

  constructor(private _quranPages: QuranPages, private _quranInJson: QuranInJson,) {
  }

  ngOnInit() {
    this.quranPageImage = "assets/" + this.pageNumber + ".png";
    debugger;

    this.generateMotashabehatOfSelectedPage(this.pageNumber);
    console.log(this.allAyas);

    this.determineHighlight();


    this.drawColoredWords();
  }

  onAyaClick($event: any) {
    // inp.isActive = true
    this.onClick.emit($event)
  }

  private generateMotashabehatOfSelectedPage(pageNumber) {
    this._quranPages.pages[pageNumber - 1].ayas.forEach(ayaInPage => {
      this.arrOfAyaWords = ayaInPage.text.split(' ');
      this.searchWord = this.arrOfAyaWords[0];
      let isCheckIn = false;""
      let ayaDetails: {
        aya: string,
        numOfCharsInWholeAya: number,
        ayaIndex: string,
        arrOfColoredWords: any[],
        sura: string,
        suraWithIndex: string,
        mooade3: {
          suraWithIndex: string,
          aya: string,
        }[]
      } = {
        arrOfColoredWords: [], mooade3: [], suraWithIndex: '', sura: '',
        aya: '', ayaIndex: '', numOfCharsInWholeAya: 0
      };
      let arrayOfMot = [];
      let arrayOfWordsWithColors = [];
      for (let i = 0; i <= this.arrOfAyaWords.length; i++) {
        this.x = [];
        let countSuras = [];

        if (i == 0) {
          this.searchWord = this.arrOfAyaWords[0];
        } else {
          this.searchWord = this.searchWord + ' ' + this.arrOfAyaWords[i];
        }
        this._quranInJson.suras.forEach(sura => {
          sura.aya.forEach(aya => {
            if (aya.text.startsWith(this.searchWord)) {
              this.x.push({
                text: aya.text,
                index: aya.index,
                suraWithIndex: sura.name + ' (' + aya.index + ') ',
                sura: sura.name,
                lastWord: this.searchWord
              });
              if (countSuras.indexOf(sura.name) < 0) {//to calculate number of suras for motashabeh
                countSuras.push(sura.name);
              }
            }
            // }
          });
        });

        if (this.x.length == 1) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "red",});
          if (!isCheckIn) {
            ayaDetails =
              {
                aya: this.x[0].text,
                numOfCharsInWholeAya: this.x[0].text.length,
                ayaIndex: this.x[0].index,
                arrOfColoredWords: arrayOfWordsWithColors,
                sura: this.x[0].sura,
                suraWithIndex: this.x[0].suraWithIndex,
                mooade3: arrayOfMot
              };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }
          this.allAyas.push(ayaDetails);
          break;
        } else if (this.x.length == 2) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "green",});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              })
            });
            ayaDetails = {
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length == 3) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "blue",});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              })
            });
            ayaDetails = {
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length == 4) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "yellow",});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              })
            });
            ayaDetails = {
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length > 4) {
          if (countSuras.length <= 6 || this.x.length <= 7) {

            arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "purple",});

            if (!isCheckIn) {
              this.x.forEach(mode3 => {
                arrayOfMot.push({
                  suraWithIndex: mode3.suraWithIndex,
                  aya: mode3.text,
                })
              });
              ayaDetails = {
                aya: this.x[0].text,
                numOfCharsInWholeAya: this.x[0].text.length,
                ayaIndex: this.x[0].index,
                sura: this.x[0].sura,
                suraWithIndex: this.x[0].suraWithIndex,
                arrOfColoredWords: arrayOfWordsWithColors,
                mooade3: arrayOfMot
              };
              isCheckIn = true;
            } else {
              ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
            }

          }
        }
      }
    });
  }

  private determineHighlight() {
    let ayasLines = [];
    this.allAyas.forEach(aya => {
      let ayaStart = this.marginTop;
      let ayaEnd;
      let numOfAyaChars = aya.numOfCharsInWholeAya;
      // console.log('numOfAyaChars: ' + numOfAyaChars);
      let isFirst = true;
      let temp = [];
      while (numOfAyaChars >= 0) {
        if (isFirst) {
          temp = [];
          if (numOfAyaChars >= 78 && ayasLines[ayasLines.length - 1] == 78) {
            ayasLines = []
          } else if (ayasLines[ayasLines.length - 1] < 78) {//if(ayasLines[ayasLines.length-1]<78)
            temp = ayasLines;
            ayasLines = [];
            numOfAyaChars = numOfAyaChars - (78 - temp[temp.length - 1]);
            ayasLines.push(78 - temp[temp.length - 1]);
            this.marginTop -= 43.75;
          }
        }
        if (numOfAyaChars >= 0) {
          if (numOfAyaChars >= 78) {
            ayasLines.push(78);
            numOfAyaChars = numOfAyaChars - 78;
          } else {
            if (temp.length > 0) {
              // numOfAyaChars=  numOfAyaChars - (78 - temp[temp.length - 1]);
              ayasLines.push(numOfAyaChars);
              if (numOfAyaChars < 78) {
                break
              }

            } else {
              ayasLines.push(numOfAyaChars);
              numOfAyaChars = numOfAyaChars - 78;
            }

          }

        } else {
          break;
        }

        isFirst = false;
      }
      // console.log('ayasLines: ' + ayasLines);
      let spans = [];
      for (let i = 0; i < ayasLines.length; i++) {
        spans.push({
          top: this.marginTop + 'px',
          left: temp.length != 0 ? i == 0 ? 60 + 'px' : 60 + (78 - ayasLines[i]) * 5 + 'px' : 60 + (78 - ayasLines[i]) * 5 + 'px',
          width: ayasLines[i] * 5 + 'px',
          height: '35px'
        });
        if (i == ayasLines.length - 1 || i == 0 || ayasLines[i] == 78)
          this.marginTop += 43.75;
        this.isShiftedVertically = i == ayasLines.length - 1;
      }
      ayaEnd = this.marginTop;
      this.motashabehatSpans = [];
      // this.drawMotashabehat(aya, ayaStart, ayaEnd);
      this.inputs.push({
        isActive: false,
        href: '#' + aya.ayaIndex,
        activeAya: aya.ayaIndex,
        spans: spans,
        motashabehatSpans: this.motashabehatSpans,
        spansOfColoredWords: []
      });



      //
      //   this.a.push(aya[aya.length-1].motashabeh[aya[aya.length-1].motashabeh.length-1].arrOfAyaWords);
      //   aya[aya.length-1].motashabeh[aya[aya.length-1].motashabeh.length-1].arrOfAyaWords.forEach(word=>{
      //   if(word.motashabeh.length>0&&word.motashabeh.length<15){
      //   if(word.motashabeh.length>7){
      //     let suras=[];
      //     word.motashabeh.forEach(modeh=>{
      //       if(suras.indexOf(modeh.sura)<0){
      //         suras.push(modeh.sura);
      //       }
      //     });
      //     if(suras.length<=6){
      //       word.motashabeh.forEach(modeh=>{
      //         // debugger
      //         this.children.push({
      //           ayaNum: aya[aya.length-1].ayaNum,
      //           sura: modeh.suraWithIndex,
      //           char: word.nOfChar * 10,
      //           word: word.word
      //         });
      //
      //       });
      //     }
      //     // break;
      //     // this.children.push({sura:aya[aya.length-1].motashabeh[0].sura,char:word.nOfChar*10,word:word.word});
      //
      //   } else if(word.motashabeh.length>1){
      //     word.motashabeh.forEach(modeh=>{
      //       // debugger
      //       if(modeh.index != word.ayaNum){
      //         this.children.push({
      //           ayaNum: aya[aya.length-1].ayaNum,
      //           sura: modeh.suraWithIndex,
      //           char: word.nOfChar * 10,
      //           word: word.word
      //         });
      //       }
      //
      //
      //     });// break;
      //   }
      //   }
      //   });
    });
  }



  private drawColoredWords() {
    for (let j = 0; j < this.allAyas.length; j++) {
      this.spansOfColoredWords = [];
      let lastWord = '';
      let isMoveToNextLine = false;
      let lineIndex = 0;
      let left = parseInt(this.inputs[j].spans[lineIndex].left) + parseInt(this.inputs[j].spans[lineIndex].width);
      let top = this.inputs[j].spans[lineIndex].top.split("px")[0];
      for (let i = 0; i < this.allAyas[j].arrOfColoredWords.length; i++) {
        let width = 0;

        if (i == 0) {
          width = this.allAyas[j].arrOfColoredWords[i].word.length * 5;
          left = left - width;
          this.spansOfColoredWords.push({
            top: parseInt(top) + 30 + "px",
            color: this.allAyas[j].arrOfColoredWords[i].color,
            width: width + 'px',
            left: left + 'px'
          });
          lastWord = this.allAyas[j].arrOfColoredWords[0].word;

        } else {
          debugger;
          let currentWord = this.allAyas[j].arrOfColoredWords[i].word.split(lastWord)[1];
          width = currentWord.length * 5;

          if ((left - width - 5) > 50) {
            left = left - width - 5;
            this.spansOfColoredWords.push({
              top: parseInt(top) + 30 + "px",
              color: this.allAyas[j].arrOfColoredWords[i].color,
              width: width + 'px',
              left: left + 'px'
            });
            isMoveToNextLine = false;
          } else {
            isMoveToNextLine = true;
            lineIndex++;
            top = this.inputs[j].spans[lineIndex].top.split("px")[0];
            left = parseInt(this.inputs[j].spans[lineIndex].left) + parseInt(this.inputs[j].spans[lineIndex].width) - width - 5;
            this.spansOfColoredWords.push({
              top: parseInt(top) + 30 + "px",
              color: this.allAyas[j].arrOfColoredWords[i].color,
              width: width + 'px',
              left: left + 'px'
            });
          }

          lastWord = this.allAyas[j].arrOfColoredWords[i].word;

        }
      }
      console.log(this.spansOfColoredWords);
      this.inputs[j].spansOfColoredWords = this.spansOfColoredWords;

    }
  }
}

