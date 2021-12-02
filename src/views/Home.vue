<template>
  <div>
    <Header />
    <div class="main">
      <div class="tryLangHeader">
        <span class="tryLangHeaderLabel">
          Try lang
        </span>
      </div>
      <div class="tryLang">
        <div class="tryLangArea">
          <textarea @keyup.ctrl.enter="tabulationHandler" autofocus v-model="sourceCode" class="tryLangIDE form-control">
          </textarea>
          <div class="tryLangStdOut">
            <div class="tryLangStdOutArea">
              <span v-for="(stackTrace, stdOutLine) in stdOut" :key="stackTrace">
                <span>
                  {{
                    stackTrace
                  }}
                </span>
                <hr v-if="stdOutLine < stdOut.length" />
              </span>
            </div>
            <div class="tryLangStdOutProgramControls">
              <button class="btn btn-success tryLangStdOutProgramControl" @click="runProgram">
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  data() {
    return {
      sourceCode: '',
      stdOut: [],
      langExtension: 'bytecode',
      handlers: {
        print() {
          alert('printHandler')
          return 'printHandler'
        }
      }
    }
  },
  methods: {
    tabulationHandler() {
        this.sourceCode += '    '
    },
    throwException(exception) {
      alert(`${exception.class}: ${exception.line.code}`)
      this.stdOut.push(`${exception.class}: строка № ${exception.line.index}; #${exception.line.code}`)
    },
    runProgram() {
      this.stdOut = []
      let blocks = 0
      let isClassMustHave = false
      let isMainFunctionMustHave = false
      this.sourceCode.split('\n').map((sourceCodeLine, sourceCodeLineIdx) => {
        let isEndLine = this.sourceCode.split('\n').length - 1 === sourceCodeLineIdx
        let isPreEndLine = this.sourceCode.split('\n').length - 2 === sourceCodeLineIdx
        if (sourceCodeLine.match(/^class .* \{$/) && !isClassMustHave) {
          blocks++
          isClassMustHave = true
          this.stdOut.push(`${sourceCodeLineIdx + 1}) Запускаю ${sourceCodeLine.replace(/class /, '').replace(/ \{/, '')}.${this.langExtension}`)

          if (isEndLine && !isMainFunctionMustHave) {
            let exception = {
              class: 'MainFunctionNotFoundException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          } else if (this.sourceCode.split('').filter(leteral => leteral === '}').length !== this.sourceCode.split('').filter(leteral => leteral === '{').length) {
            // blocks !== 0 && !isMainFunctionMustHave && !isPreEndLine && isClassMustHave
            let exception = {
              class: 'MainFunctionNotFoundException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          }

        } else if (blocks >= 1 && isClassMustHave) {
          let isExpression = sourceCodeLine.match(/^.*\(.*\).*$/)
          if (sourceCodeLine.match(/^.*\{.*$/)) {
            blocks++
            if (sourceCodeLine.match(/^.*void main.*\(.*\).*\{.*$/)) {
              isMainFunctionMustHave = true
            }
          } else if (sourceCodeLine.match(/^.*\}.*$/)) {
            blocks--
            if (isMainFunctionMustHave) {
              isMainFunctionMustHave = false
            } else if (!isMainFunctionMustHave) {
              let exception = {
                class: 'MainFunctionNotFoundException',
                line: {
                  code: sourceCodeLine,
                  index: sourceCodeLineIdx
                }
              }
              // this.throwException(exception)
            }
          } else if (!isExpression) {
            let exception = {
              class: 'NotRightMarkupException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          } else if (isExpression && isMainFunctionMustHave) {
            // выполнить команду
            let exitCode = sourceCodeLine.replace(/print\(\'/, '').replace(/\'.*\).*/, '')
            let methodName = sourceCodeLine.replace(/\(.*\)/, '').replaceAll(' ', '')
            let methodParams = sourceCodeLine.replace(/.*\(/, '').replace(/\)/, '').replaceAll(' ', '').split(',')
            if (methodName === 'print') {
              exitCode = sourceCodeLine.replace(/print\(\'/, '').replace(/\'.*\).*/, '')
            } else {
              // собственные функции
              let sourceStartStringIndex = this.sourceCode.split('\n').findIndex(source => source.includes(`void ${methodName}`))
              if (sourceStartStringIndex !== -1 ) {
                let sourceEndStringIndex = this.sourceCode.split('\n').findIndex((source, sourceIdx) => sourceIdx >= sourceStartStringIndex && source.includes(`\}`))
                if (sourceEndStringIndex !== -1 ) {
                  this.sourceCode.split('\n').filter((sourceCodeLine, sourceCodeLineIdx) => sourceCodeLineIdx > sourceStartStringIndex && sourceCodeLineIdx < sourceEndStringIndex).map(source => {
                    let isExpression = source.match(/^.*\(.*\).*$/)
                    if (isExpression) {
                      alert(`methodParams: ${methodParams}`)
                      exitCode = source.replace(/print\(\'/, '').replace(/\'.*\).*/, '')
                      let methodName = source.replace(/\(.*\)/, '').replaceAll(' ', '')
                      if (methodName === 'print') {
                        exitCode = source.replace(/print\(\'/, '').replace(/\'.*\).*/, '')
                        // alert(source.replace(/.*\(/, '').replace(/\).*/, ''))
                        // let methodParams = sourceCodeLine.replace(/.*\(/, '').replace(/\)/, '').replaceAll(' ', '').split(',')
                      }
                      // this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
                    }
                  })
                }
              } else {
                let exception = {
                  class: 'FunctionNotFoundException',
                  line: {
                    code: sourceCodeLine,
                    index: sourceCodeLineIdx
                  }
                }
                this.throwException(exception)
                return
              }
              // alert(`sourceStartString: ${sourceStartString}`)
            }
            // if (!Number(sourceCodeLine.replace(/.*\(\'/, '').replace(/\'.*\).*/, ''))) {
            //   exitCode = sourceCodeLine.replace(/\(\'/, '').replace(/\'.*\).*/, '')
            // } else if (!!Number(sourceCodeLine.replace(/.*\(/, '').replace(/.*\).*/, ''))) {
            //   exitCode = sourceCodeLine.replace(/\(/, '').replace(/.*\).*/, '')
            // }
            
            // this.handlers[methodName]()
            this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
          }
        } else {
          if (blocks === 0 && isClassMustHave) {
            let exception = {
              class: 'NotRightMarkupException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          } else if (isEndLine && !isClassMustHave) {
            let exception = {
              class: 'ClassNotFoundException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          }
        }
        
      })

    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped>
  
  .tryLang {
    display: flex;
    justify-content: center;
    height: 350px;
    
  }

  .tryLangArea {
    width: 75%;
    display: flex;
    justify-content: center;
    border: 1px solid rgb(175, 175, 175);
    border-radius: 8px;
  }

  .tryLangIDE {
    box-sizing: border-box;
    padding: 15px;
    width: 65%;
    background-color: rgb(75, 75, 75);
    color: rgb(255, 255, 255);
    border-radius: 8px;
  }

  .tryLangStdOut {
    box-sizing: border-box;
    padding: 15px;
    width: 35%;
    background-color: rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
    border-radius: 8px;
  }

  .tryLangStdOutArea {
    overflow-y: scroll;
    height: 85%;
    display: flex;
    flex-direction: column;
  }

  .tryLangStdOutProgramControls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
  }

  .tryLangStdOutProgramControl {
    width: 100px;
  }

  .tryLangHeader {
    display: flex;
    justify-content: center;
    height: 50px;
    margin: 25px 0px;
  }

  .tryLangHeaderLabel {
    font-size: 32px;
    font-weight: 600;
  }

</style>