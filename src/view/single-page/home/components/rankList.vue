<template>
    <ul class="rank-list">
        <li class="title">
            <span>{{ title[0] }}</span>
            <span>{{ title[1] }}</span>
            <span v-if="isPos">CSN</span>
            <span>{{ title[2] }}</span>
        </li>
        <li v-for="(item, i) in data" :key="i">
            <span>{{ item[property[0]] }}</span>
            <span>
              <Tooltip :content="item[property[1]]" placement="top">
                {{ item[property[1]] }}
              </Tooltip>
            </span>
            <span v-if="isPos">
              <Tooltip :content="item.csnNo" placement="top">
                {{ item.csnNo }}
              </Tooltip>
            </span>
            <span v-if="isPos">{{ item[property[3]] }}/{{ item[property[4]] }}</span>
            <span v-else>{{ item[property[2]] }}/{{ item[property[3]] }}</span>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'rankList',
  props: {
    title: {
      type: Array,
      default() {
        return ['排名', '名称', '交易流水(元)/占比']
      }
    },
    isPos: {
      type: Boolean,
      default: false
    },
    property: {
      type: Array,
      default() {
        return ['rank', 'name', 'transactionCount', 'rate']
      }
    },
    data: {
      required: true,
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.rank-list {
  .title {
    // margin-top: 26px;
    color: rgba(0, 0, 0, 0.3);
  }

  /deep/ li {
    display: flex;
    height: 40px;
    line-height: 40px;
    list-style: none;

    &:nth-child(n + 2) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    span:nth-child(1) {
      flex-basis: 15%;
      min-width: 30px;
    }
    span:nth-child(2) {
      flex: 1;
      // padding-right: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      min-width: 40px;
    }
    span:nth-child(3) {
      min-width: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex-basis: 15%;
    }
    span:last-of-type {
      min-width: 122px;
      flex-basis: 32%;
    }

    span {
      .ivu-tooltip {
        display: inline;

        .ivu-tooltip-rel {
          display: inline;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
