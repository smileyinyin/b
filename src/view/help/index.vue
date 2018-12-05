<script>
import Sticky from '@/components/sticky'
import { debounce } from '@/libs/util'
import data from './data' // TODO b端得分角色展示帮助
import bankData from './bankData'

function normalize(value) {
  return Object.prototype.toString.call(value) === '[object Array]' ? value : [value]
}

export default {
  name: 'help',
  computed: {
    data() {
      if (this.isStoreRole) {
        let { title, section } = data
        return { title, section: [ ...section, ...bankData ] }
      }
      return data
    },
    isStoreRole() { // 判断当前用户是否商户角色
      return this.$store.state.user.access && this.$store.state.user.access[0] === 'SXR004'
    }
  },
  mounted() {
    this.offsetArr = this.getSectionOffsetArr()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取所有 section 的 offset 高度
    getSectionOffsetArr() {
      return Array.from(this.$refs['sectionBox'].children).map(item => item.offsetTop)
    },

    // 处理滚动时 nav 活跃的变化
    handleScroll: debounce(function(e) {
      let scrollTop = window.pageYOffset || (document.documentElement.scrollTop + document.body.scrollTop)
      let i = 0
      for (; i < this.offsetArr.length - 1; i++) {
        if (this.offsetArr[i] + 37 > scrollTop) {
          break
        }
      }

      let navs = this.$refs['nav'].children
      for (let j = 0; j < navs.length; j++) {
        if (i === j) {
          navs[j].classList.add('active')
        } else {
          navs[j].classList.remove('active')
        }
      }
    }, 33),

    // 处理 nav 点击
    handleClickNav(i) {
      window.scrollTo(0, this.offsetArr[i] + 38)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  render(h) {
    let { title, section } = this.data
    return (
      <div class="help" >
        <p class="subTitle">帮助 > 合伙人系统操作说明</p>
        <h2 class="title">{ title }</h2>
        <div ref="sectionBox">
          {
            section.map(({ title, content, img, children }) => (
              <section class="section">
                <h3 class="section-title">{ title }</h3>

                {
                  !!content && normalize(content).map(subCon => {
                    return <p>{ subCon }</p>
                  })
                }

                {
                  !!img && normalize(img).map(imgUrl => (<div class="img-box"><img v-preview height="360" src={imgUrl}/></div>))
                }

                {
                  !!children && normalize(children).map(({ type, title, content, img }) => {
                    // debugger
                    if (type === 'subSection') {
                      return (
                        <div class="subSection">
                          {
                            !!title && <h3 class="subSection-title">{ title }</h3>
                          }
                          {
                            !!content && normalize(content).map(subCon => {
                              return <p>{ subCon }</p>
                            })
                          }
                          {
                            !!img && normalize(img).map(imgUrl => (<div class="img-box"><img v-preview height="360" src={imgUrl}/></div>))
                          }
                        </div>
                      )
                    } else if (type === 'list') {
                      return (
                        <div class="list">
                          {
                            !!title && <h3 class="list-title">{ title }</h3>
                          }
                          {
                            !!content && <ul>
                              {
                                normalize(content).map(subCon => {
                                  return <li>{ subCon }</li>
                                })
                              }
                            </ul>
                          }
                          {
                            !!img && normalize(img).map(imgUrl => (<div class="img-box"><img v-preview height="360" src={imgUrl}/></div>))
                          }
                        </div>
                      )
                    } else if (type === 'content') {
                      return (
                        <div class="content">
                          {
                            !!content && normalize(content).map(subCon => {
                              return <p>{ subCon }</p>
                            })
                          }
                          {
                            !!img && normalize(img).map(imgUrl => (<div class="img-box"><img v-preview height="360" src={imgUrl}/></div>))
                          }
                        </div>
                      )
                    }
                  })
                }
              </section>
            ))
          }
        </div>
        <Sticky class="nav" stickyTop={98}>
          <ul ref="nav">
            <li class="nav-item nav-title active">本页目录</li>
            {
              section.map((sec, i) => (<li class="nav-item" onClick={() => this.handleClickNav(i)}>{sec.title}</li>))
            }
          </ul>
        </Sticky>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.help {
  position: relative;
  padding: 0 160px 0 20px;

  .title {
    font-size: 22px;
    padding-bottom: 10px;
  }

  .section {
    margin-bottom: 20px;

    .subSection, .list {
      margin: 20px 0;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
    }

    .subSection-title, .list-title {
      margin-bottom: 10px;
    }

    p, li {
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
    }
    li {
      margin-left: 20px;
    }
  }

  .subTitle {
    font-size: 12px;
    padding: 0 0 20px;
  }

  .img-box {
    display: flex;
    height: 360px;
    margin-bottom: 20px;
  }
  img {
    max-width: 100%;
  }

  .nav {
    position: absolute;
    width: 100px;
    right: 0;
    top: 10px;

    .nav-item {
      list-style: none;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      border-left: 4px solid #ebecec;
      cursor: pointer;

      &.nav-title {
        font-size: 16px;
        font-weight: bold;
      }

      &.active {
        border-left-color: #00c1de;
        color: #00c1de;
      }
    }
  }
}
</style>
