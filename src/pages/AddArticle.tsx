import React, { useState } from "react";
import { marked } from "marked";
import { Row, Col, Input, Select, Button, DatePicker } from "antd";
import "../static/css/addArticle.css";
const { Option } = Select;
const { TextArea } = Input;

const AddArticle = () => {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    // tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e: any) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e: any) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="文章标题"></Input>
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue="1">
                <Option value="1"> 视频教程1</Option>
                <Option value="2"> 视频教程2</Option>
                <Option value="3"> 视频教程3</Option>
                <Option value="4"> 视频教程4</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={26}
                placeholder="文章内容"
                onChange={(e) => changeContent(e)}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button>暂存文章</Button>
              &nbsp;
              <Button type="primary">发布文章</Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={(e) => changeIntroduce(e)}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker placeholder="发布日期" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddArticle;
