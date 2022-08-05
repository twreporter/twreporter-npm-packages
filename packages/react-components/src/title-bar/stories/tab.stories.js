import React from 'react'
import Tab from '../components/tab'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'

export default {
  title: 'Title Bar/Tab',
  component: Tab,
}

const Template = args => <Tab {...args} />

export const tab = Template.bind({})
tab.args = {
  title: '主分類',
  tabs: [
    { text: '子分類1', isExternal: true, link: 'https://www.google.com' },
    { text: '子分類2', isExternal: true, link: 'https://www.google.com' },
    { text: '子分類3', isExternal: true, link: 'https://www.google.com' },
    { text: '子分類4', isExternal: true, link: 'https://www.google.com' },
    { text: '子分類5', isExternal: true, link: 'https://www.google.com' },
    { text: '子分類6', isExternal: true, link: 'https://www.google.com' },
  ],
  releaseBranch: releaseBranchConsts.master,
}

export const animalTab = Template.bind({})
animalTab.args = {
  title: '動物',
  tabs: [
    { text: '長頸鹿', isExternal: true, link: 'https://www.google.com' },
    { text: '海豚', isExternal: true, link: 'https://www.google.com' },
    { text: '猴子', isExternal: true, link: 'https://www.google.com' },
    { text: '熊貓', isExternal: true, link: 'https://www.google.com' },
    { text: '刺蝟', isExternal: true, link: 'https://www.google.com' },
    { text: '天竺鼠', isExternal: true, link: 'https://www.google.com' },
    { text: '比目魚', isExternal: true, link: 'https://www.google.com' },
    { text: '眼鏡蛇', isExternal: true, link: 'https://www.google.com' },
    { text: '虎鯨', isExternal: true, link: 'https://www.google.com' },
    { text: '台北樹蛙', isExternal: true, link: 'https://www.google.com' },
    { text: '雨傘節', isExternal: true, link: 'https://www.google.com' },
    { text: '獨角獸', isExternal: true, link: 'https://www.google.com' },
    { text: '蠑螈', isExternal: true, link: 'https://www.google.com' },
    { text: '珊瑚蟲', isExternal: true, link: 'https://www.google.com' },
    { text: '老鼠', isExternal: true, link: 'https://www.google.com' },
    { text: '皮卡丘', isExternal: true, link: 'https://www.google.com' },
    { text: '犀牛', isExternal: true, link: 'https://www.google.com' },
    { text: '馬來膜', isExternal: true, link: 'https://www.google.com' },
    { text: '孔雀', isExternal: true, link: 'https://www.google.com' },
    { text: '臺灣黑熊', isExternal: true, link: 'https://www.google.com' },
    { text: '黑面琵鷺', isExternal: true, link: 'https://www.google.com' },
    { text: '大笨鳥', isExternal: true, link: 'https://www.google.com' },
    { text: '麻雀', isExternal: true, link: 'https://www.google.com' },
    { text: '綠繡眼', isExternal: true, link: 'https://www.google.com' },
    { text: '五色鳥', isExternal: true, link: 'https://www.google.com' },
    { text: '赤腹松鼠', isExternal: true, link: 'https://www.google.com' },
    { text: '狐蒙', isExternal: true, link: 'https://www.google.com' },
    { text: '無尾熊', isExternal: true, link: 'https://www.google.com' },
    { text: '鼴鼠', isExternal: true, link: 'https://www.google.com' },
    { text: '福壽螺', isExternal: true, link: 'https://www.google.com' },
    { text: '羊駝', isExternal: true, link: 'https://www.google.com' },
    { text: '孔雀魚', isExternal: true, link: 'https://www.google.com' },
    { text: '紅嘴灰鵯', isExternal: true, link: 'https://www.google.com' },
    { text: '津田氏竹節蟲', isExternal: true, link: 'https://www.google.com' },
    { text: '田鼠', isExternal: true, link: 'https://www.google.com' },
    { text: '曙光鳳蝶', isExternal: true, link: 'https://www.google.com' },
    { text: '雙髻鯊', isExternal: true, link: 'https://www.google.com' },
    { text: '北極熊', isExternal: true, link: 'https://www.google.com' },
    { text: '人面蜘蛛', isExternal: true, link: 'https://www.google.com' },
    { text: '吳郭魚', isExternal: true, link: 'https://www.google.com' },
    { text: '狐狸', isExternal: true, link: 'https://www.google.com' },
    { text: '黃鶯', isExternal: true, link: 'https://www.google.com' },
    { text: '燕子', isExternal: true, link: 'https://www.google.com' },
    { text: '鴿子', isExternal: true, link: 'https://www.google.com' },
  ],
  releaseBranch: releaseBranchConsts.release,
}
