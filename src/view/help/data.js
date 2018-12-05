export default {
  title: '合伙人系统操作说明',
  section: [
    {
      title: '登录',
      content: [
        '角色：城市合伙人 渠道合伙人  业务员  商户',
        '输入上下网分公司分配的账号密码，进行登录，一般会用您的手机号作为登录账号。首次登录，默认密码：123456。您可以登录后自行修改。'
      ],
      img: 'http://img.sxwhome.com/FrgL17qr0zlJM8Xz23k7FuzCpReA?imageMogr2/format/jpg'
    },
    {
      title: '商户管理',
      content: [
        '角色：城市合伙人  渠道合伙人  业务员',
        '用于管理自己的商户、门店的功能'
      ],
      img: 'http://img.sxwhome.com/FlFZaSFXHixmKnh6LCbD5uL5NAl1?imageMogr2/format/jpg'
    },
    {
      title: '用户管理',
      children: [
        {
          type: 'subSection',
          title: '1. 渠道合伙人列表',
          content: [
            '角色：城市合伙人',
            '城市合伙人管理自己发展的渠道合伙人'
          ],
          img: 'http://img.sxwhome.com/Fj6NQoDDPKW-Tma2-6uziJ5wVm4z?imageMogr2/format/jpg'
        },

        {
          type: 'subSection',
          title: '2. 业务员列表',
          content: [
            '角色：城市合伙人  渠道合伙人',
            '用于城市合伙人和渠道合伙人管理自己的业务员'
          ],
          img: 'http://img.sxwhome.com/Fk5P5HTgzFhX1eB3FF19pUyDyJVm?imageMogr2/format/jpg'
        }
      ]
    },
    {
      title: 'POS机管理',
      content: '',
      children: [
        {
          type: 'subSection',
          title: '1. 商户进件',
          content: [
            '角色：城市合伙人  渠道合伙人  业务员',
            '新增进件，需要选择商户和门店（商户和门店信息来源于商户管理）。',
            '需要确认账户类型、商户小票名称、购买政策、借记卡费率、封顶金额、贷记卡费率、扫码基准费率、银联二维码费率、银联二维码标准费率、上传协议照、上传商户信息表。'
          ]
        },

        {
          type: 'list',
          content: [
            '情况1，账号类型为对公：输入开户名、开户支行、银行卡号、开户许可证',
            '情况2，账号类型为对私且是同法人：输入银行卡号、银行卡正面',
            '情况3，账号类型为对私且非同法人：输入结算人姓名、结算人身份证号、结算人身份证有效期、结算人身份证正反面、开户名、开户支行、开户银行卡号、授权结算书，银行卡正面照。'
          ]
        },

        {
          type: 'content',
          content: [
            '查看：查看进件信息',
            '编辑：对进件失败的进件信息进行修改并重新提交进件',
            '审核详情：查看进件审核不通过的原因',
            '激活：对已进件成功的商户资料和POS机进行绑定，需要填写：CSN号、激活码、终端号。'
          ],
          img: [
            'http://img.sxwhome.com/Fq6bxCzVhAf8ea22Fdw_x_hT-tic?imageMogr2/format/jpg',
            'http://img.sxwhome.com/Fv4wdJ1kzXwKDMoQ_SEFu_wjaNh-?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FlfBVVqkFvbYLAVQlHV1XOt4hfFy?imageMogr2/format/jpg'
          ]
        },

        {
          type: 'subSection',
          title: '2. 终端列表',
          content: [
            '角色：城市合伙人  渠道合伙人  业务员',
            '展示所有已进件成功的POS机，可用于查看POS机的使用状态。',
            '购买政策：表明POS机的购买政策',
            '是否达标：表明该 购买政策下，这台POS的流水是否达到政策的标准',
            '是否转正：表明该POS是否满足转正条件',
            '进件人：表明该POS的进件人员是谁'
          ],
          img: [
            'http://img.sxwhome.com/Fh4P4b8FnA1M4_SFM4pGRx4vl26-?imageMogr2/format/jpg'
          ]
        }
      ]
    },
    {
      title: '财务管理',
      content: '',
      children: [
        {
          type: 'subSection',
          title: '1. 我的结算',
          content: [
            '角色：城市合伙人  渠道合伙人',
            '城市和渠道合伙人每月与分公司进行结算的月账单管理列表',
            '上传发票：对未提现的月账单进行上传发票操作',
            '审核不通过：对发票信息有误未审核通过的月账单进行修改发票信息并重新提交',
            '查看打款信息：对已审核通过的发票信息，分公司将打款信息上传，可以查看到打款信息'
          ],
          img: [
            'http://img.sxwhome.com/Fkwh004QWYngsZL3dAMACbuP8EHi?imageMogr2/format/jpg'
          ]
        },

        {
          type: 'subSection',
          title: '2. 交易记录',
          content: [
            '角色：城市合伙人  渠道合伙人  业务员',
            '用于城市合伙人、渠道合伙人、业务员查看自己发现的POS交易记录'
          ],
          img: [
            'http://img.sxwhome.com/FgaoCzc-Fq36xxI83v8cTbj_Lusl?imageMogr2/format/jpg'
          ]
        }
      ]
    },
    {
      title: '修改密码',
      content: [
        '通过原密码修改登录密码。',
        '账号的初始密码为：123456。为使用安全可进行密码修改。'
      ],
      img: 'http://img.sxwhome.com/FnUOCm339qa4y02cH6rT43LTpoMl?imageMogr2/format/jpg'
    },
    {
      title: '门店管理',
      content: [
        '角色：商户',
        '用于商户查看自己的门店信息。'
      ],
      img: [
        'http://img.sxwhome.com/FojDcvGCALluRGfLDdfT_mBT62zc?imageMogr2/format/jpg'
      ]
    },
    {
      title: '会员管理',
      content: [
        '用于商户查看自己的会员'
      ],
      img: [
        'http://img.sxwhome.com/FmSGfshGB3f2zAC_HoIg6abwl8nD?imageMogr2/format/jpg'
      ]
    },
    {
      title: '终端列表',
      content: [
        '用于商户查看自己的POS机的状态'
      ],
      img: [
        'http://img.sxwhome.com/Fs3zvW6HX18ss7tZijZOS2VP-bR5?imageMogr2/format/jpg'
      ]
    },
    {
      title: '交易记录',
      content: [
        '用于商家查看自己的POS交易记录'
      ],
      img: [
        'http://img.sxwhome.com/FqME_5jHMHYlbmtp9wLOk-Da_kFl?imageMogr2/format/jpg'
      ]
    }
  ]
}
