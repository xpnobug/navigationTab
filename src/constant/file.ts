/** @desc 文件模块-映射 */

export interface fileTypeListItem {
  name: string;
  value: number;
  menuIcon: string;
  icon: string;
}

// 文件分类
export const fileTypeList: fileTypeListItem[] = [
  { name: '全部', value: 0, menuIcon: 'menu-file', icon: 'icon-quanbu' },
  { name: '图片', value: 2, menuIcon: 'file-image', icon: 'icon-tupian' },
  { name: '文档', value: 3, menuIcon: 'file-txt', icon: 'icon-wendang' },
  { name: '视频', value: 4, menuIcon: 'file-video', icon: 'icon-shipin' },
  { name: '音频', value: 5, menuIcon: 'file-music', icon: 'icon-wenjianleixing-yinpin' },
  { name: '其他', value: 1, menuIcon: 'file-other', icon: 'icon-qita' },
];

export interface FileExtendNameIconMap {
  [key: string]: string;
}

// 文件类型图标 Map 映射
export const fileExtendNameIconMap: FileExtendNameIconMap = {
  mp3: 'icon-wenjianleixing-yinpin',
  mp4: 'icon-shipin',
  dir: 'file-dir',
  ppt: 'icon-ppt',
  doc: 'file-wps',
  docx: 'icon-wendang-docx_doc',
  xls: 'file-excel',
  xlsx: 'icon-xlsx',
  txt: 'icon-wendang',
  rar: 'file-rar',
  zip: 'icon-zip',
  html: 'icon-html',
  css: 'file-css',
  js: 'file-js',
  other: 'icon-qita', // 未知文件
};

// 图片类型
export const imageTypeList = ['jpg', 'png', 'gif', 'jpeg'];

// WPS、Office文件类型
export const officeFileType = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'];
