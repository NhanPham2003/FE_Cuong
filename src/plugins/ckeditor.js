import { ClassicEditor as ClassicEditorBase } from "@ckeditor/ckeditor5-editor-classic"

import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Autosave } from '@ckeditor/ckeditor5-autosave'
import {
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Bold,
} from '@ckeditor/ckeditor5-basic-styles'
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services'
import { CodeBlock } from '@ckeditor/ckeditor5-code-block'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace'
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font'
import { Heading, Title } from '@ckeditor/ckeditor5-heading'
import { Highlight } from '@ckeditor/ckeditor5-highlight'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed'
import {
  DataFilter,
  DataSchema,
  GeneralHtmlSupport,
  HtmlComment,
} from '@ckeditor/ckeditor5-html-support'
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from '@ckeditor/ckeditor5-image'
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent'
import { TextPartLanguage } from '@ckeditor/ckeditor5-language'
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link'
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list'

// import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm'
import { MediaEmbed, MediaEmbedToolbar } from '@ckeditor/ckeditor5-media-embed'
import { Mention } from '@ckeditor/ckeditor5-mention'
import { PageBreak } from '@ckeditor/ckeditor5-page-break'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format'
import { StandardEditingMode } from '@ckeditor/ckeditor5-restricted-editing'
import { SelectAll } from '@ckeditor/ckeditor5-select-all'
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks'
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing'
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
} from '@ckeditor/ckeditor5-special-characters'
import { Style } from '@ckeditor/ckeditor5-style'
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog'
import { WordCount } from '@ckeditor/ckeditor5-word-count'
import CloudinaryUploadPlugin from "@/plugins/CloudinaryUploadAdapter"

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Alignment,
  AutoImage,
  AutoLink,
  Autoformat,
  Autosave,
  CloudServices,
  Code,
  CodeBlock,
  DataFilter,
  DataSchema,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  CloudinaryUploadPlugin,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,

  // Markdown,
  MediaEmbed,

  // MediaEmbedToolbar,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  StandardEditingMode,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  Bold,
  WordCount,
]

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',

      // 'style',
      // 'textPartLanguage',
      '|',
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'outdent',
      'indent',
      '|',
      'link',
      'insertTable',

      // 'imageUpload',
      'cloudinaryUploadButton',
      'mediaEmbed',

      // 'imageInsert',
      'htmlEmbed',
      'horizontalLine',
      'pageBreak',
      '|',
      'alignment',
      'code',
      'codeBlock',
      '|',
      'highlight',
      'removeFormat',
      'selectAll',
      'findAndReplace',
      'restrictedEditingException',
      'showBlocks',
      'sourceEditing',
      'specialCharacters',
    ],
    shouldNotGroupWhenFull: true,
  },
  language: 'en',
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties',
    ],
  },
}
