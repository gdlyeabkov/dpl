<template>
  <div>
    <Header />
    <div class="main">
      <div class="aboutLang">
        <div class="aboutLangItem">
          <span class="aboutLangItemHeader">
            Build fast, reliable, and efficient software at<br />scale
          </span>
          <div class="benefits">
            <div class="benefit">
              <span class="benefitItem material-icons">
                done
              </span>
              <span class="benefitItem">
                Go is an open source programming language supported by Google
              </span>
            </div>
            <div class="benefit">
              <span class="benefitItem material-icons">
                done
              </span>
              <span class="benefitItem">
                Easy to learn and get started with
              </span>
            </div>
            <div class="benefit">
              <span class="benefitItem material-icons">
                done
              </span>
              <span class="benefitItem">
                Built-in concurrency and a robust standard library
              </span>
            </div>
            <div class="benefit">
              <span class="benefitItem material-icons">
                done
              </span>
              <span class="benefitItem">
                Growing ecosystem of partners, communities, and tools
              </span>
            </div>
          </div>
          <div class="btnsContainer">
            <button class="btnsContainerItem btn btn-warning">
              Get Started
            </button>
            <button class="btnsContainerTransparentItem btnsContainerItem btn btn-light">
              Download
            </button>
          </div>
          <span class="aboutLangItemContent">
            Download packages for Windows 64-bit, macOS, Linux, and more
          </span>
          <span class="aboutLangItemContent">
            The go command by default downloads and authenticates modules using the Go module mirror and Go checksum database run by Google. Learn more.
          </span>
        </div>
        <img src="https://go.dev/images/gophers/ladder.svg" alt="" width="180px" class="langLogo" />
      </div>
      <div class="companiesUsingLang">
        <span class="companiesUsingLangHeader">
          Companies using Lang
        </span>
        <span class="companiesUsingLangDesc">
          Organizations in every industry use Go to power their software and services View all stories
        </span>
        <div class="companies">
          <div class="companiesColumn">
            <img class="company" src="https://go.dev/images/logos/google.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/dropbox.png" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/riotgames.png" alt="" width="150px" />
          </div>
          <div class="companiesColumn">
            <img class="company" src="https://go.dev/images/logos/paypal.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/cloudflare.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/salesforce.svg" alt="" width="150px" />
          </div>
          <div class="companiesColumn">
            <img class="company" src="https://go.dev/images/logos/american-express.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/facebook.png" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/target.svg" alt="" width="150px" />
          </div>
          <div class="companiesColumn">
            <img class="company" src="https://go.dev/images/logos/mercado-libre.png" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/microsoft.png" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/twitch.svg" alt="" width="150px" />
          </div>
          <div class="companiesColumn">
            <img class="company" src="https://go.dev/images/logos/capital-one.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/wildlife.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/twitter.svg" alt="" width="150px" />
          </div>
          <div class="companiesColumn">
            <img class="company" src="https://go.dev/images/logos/cockroach.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/netflix.svg" alt="" width="150px" />
            <img class="company" src="https://go.dev/images/logos/uber.svg" alt="" width="150px" />
          </div>
        </div>
      </div>
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
              this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
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
                      let isCompareParams = methodParams.length === this.sourceCode.split('\n')[sourceStartStringIndex].replace(/.*\(/, '').replace(/\).*/, '').split(',').length
                      // alert(`methodParams.length: ${methodParams.length}; ${}`)
                      if (!isCompareParams) {
                        let exception = {
                          class: 'ArgumentsCountException',
                          line: {
                            code: sourceCodeLine,
                            index: sourceCodeLineIdx
                          }
                        }
                        this.throwException(exception)
                        return
                      } else if (isCompareParams) {
                        exitCode = source.replace(/print\(\'/, '').replace(/\'.*\).*/, '')
                        let methodName = source.replace(/\(.*\)/, '').replaceAll(' ', '')
                        if (methodName === 'print') {
                          let isContstant = (typeof source.replace(/.*print\(/, '').replace(/\).*/, '') === 'string' && source.replace(/.*print\(/, '').replace(/\).*/, '').includes('\'') || typeof source.replace(/.*print\(/, '').replace(/\).*/, '') === 'number' || typeof source.replace(/.*print\(/, '').replace(/\).*/, '') === 'boolean')
                          let isLiteralDefined = this.sourceCode.split('\n')[sourceStartStringIndex].replace(/.*\(/, '').replace(/\).*/, '').split(',').includes(source.replace(/.*print\(/, '').replace(/\).*/, ''))
                          if (isContstant) {
                            exitCode = source.replace(/print\(\'/, '').replace(/\'.*\).*/, '')
                            this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
                          } else if (!isContstant && isLiteralDefined) {
                            let outputMethodParams = methodParams.map(methodParam => {
                              return methodParam.includes('') ? methodParam.replaceAll('\'', '') : methodParam
                            })
                            let argumentIndex = this.sourceCode.split('\n')[sourceStartStringIndex].replace(/.*\(/, '').replace(/\).*/, '').split(',').findIndex(argument => argument === source.replace(/.*print\(/, '').replace(/\).*/, ''))
                            let needArguments = outputMethodParams.filter((methodParam, methodParamIndex) => methodParamIndex === argumentIndex)
                            let isArgumentDefined = argumentIndex >= 0 && needArguments.length >= 1
                            let needArgument = ''
                            if (isArgumentDefined) {
                              needArgument = needArguments[0]
                            }
                            alert(`Это переменная нужно брать параметр: ${needArgument}`)
                            // exitCode = outputMethodParams
                            exitCode = needArgument
                            this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
                          } else if (!isLiteralDefined) {
                            let exception = {
                              class: 'UndefinedLiteralException',
                              line: {
                                code: sourceCodeLine,
                                index: sourceCodeLineIdx
                              }
                            }
                            this.throwException(exception)
                            return
                          }
                          // let methodParams = sourceCodeLine.replace(/.*\(/, '').replace(/\)/, '').replaceAll(' ', '').split(',')
                        }
                        // this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
                      }
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
            
            // раньше строка ниже была раскоментирована
            // this.stdOut.push(`${sourceCodeLineIdx + 1}) ${exitCode}`)
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

  .companies {
    display: flex;
    justify-content: center;
    height: 500px;
  }

  .companiesColumn {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
    align-items: center;
  }

  .company {
    margin: 50px 0px;
    width: 75px;
  }

  .companiesUsingLang {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .companiesUsingLangHeader {
    font-size: 28px;
  }

  .companiesUsingLangDesc {
    font-size: 18px;
  }

  .aboutLang {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 150, 200);
    border-top: 2px solid rgb(100, 150, 200)
  }

  .aboutLangItem {
    width: 65%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .aboutLangItemHeader {
    font-size: 36px;
    color: rgb(255, 255, 255);
  }

  .benefits {
    display: flex;
    flex-direction: column;
    margin: 25px 0px;
  }

  .benefit {
    display: flex;
  }

  .benefitItem {
    color: rgb(255, 255, 255);
    margin: 0px 10px;
  }

  .btnsContainer {
    display: flex;
  }

  .btnsContainerItem {
    font-size: 24px;
    width: 250px;
    height: 75px;
    margin: 0px 10px;
  }

  .btnsContainerTransparentItem {
    background-color: transparent;
    color: rgb(255, 255, 255);
  }

  .langLogo {
    margin-top: 350px;
  }

  .aboutLangItemContent {
    color: rgb(255, 255, 255);
    margin: 10px 0px;
  }

</style>