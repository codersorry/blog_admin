import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import "../../static/css/addArticle.css";
import {
  getTypeInfo,
  addArticle,
  updateArticle,
  getArticleById,
} from "../../services/admin";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;

const AddArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(""); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  useEffect(() => {
    getTypeData();
    if (id) {
      //@ts-ignore
      setArticleId(id);
      getArticleData(id);
    }
  }, []);

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

  const getTypeData = async () => {
    const res = await getTypeInfo();
    //@ts-ignore
    if (res.result) {
      //@ts-ignore
      setTypeInfo(res.data);
    } else {
      localStorage.removeItem("openId");
      navigate("/");
    }
  };

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

  //选择文章类别下拉框
  const selectTypeHandle = (value: any) => {
    setSelectType(value);
  };

  //修改文章，根据文章id获取文章学习，并回显
  const getArticleData = async (id: any) => {
    const res = await getArticleById(id);
    //@ts-ignore
    if (res.result) {
      //let articleInfo= res.data.data[0]
      //@ts-ignore
      setArticleTitle(res.data[0].title);
      //@ts-ignore
      setArticleContent(res.data[0].article_content);
      //@ts-ignore
      let html = marked(res.data[0].article_content);
      //@ts-ignore
      setMarkdownContent(html);
      //@ts-ignore
      setIntroducemd(res.data[0].introduce);
      //@ts-ignore
      let tmpInt = marked(res.data[0].introduce);
      //@ts-ignore
      setIntroducehtml(tmpInt);
      //@ts-ignore
      setShowDate(res.data[0].addTime);
      //@ts-ignore
      setSelectType(res.data[0].typeId);
    }
  };

  //保存文章
  const saveArticle = async () => {
    if (!selectedType) {
      message.destroy();
      message.error("请选择文章类型");
      return false;
    } else if (!articleTitle) {
      message.destroy();
      message.error("文章名称不为空");
      return false;
    } else if (!articleContent) {
      message.destroy();
      message.error("文章内容不为空");
      return false;
    } else if (!introducemd) {
      message.destroy();
      message.error("文章简介不为空");
      return false;
    } else if (!showDate) {
      message.destroy();
      message.error("发布日期不为空");
      return false;
    } else {
      message.destroy();
      message.success("检测通过");
    }

    let dataProps: any = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    // dataProps.dateText = showDate.replace("-", "/");
    dataProps.addTime = showDate;

    if (articleId === 0) {
      dataProps.view_count = 0;
      const res = await addArticle(dataProps);
      //@ts-ignore
      if (res.result) {
        //@ts-ignore
        setArticleId(res.insertId);
        message.destroy();
        message.success("文章保存成功");
      } else {
        message.destroy();
        message.error("文章保存失败");
      }
    } else {
      dataProps.id = articleId;
      const res = await updateArticle(dataProps);
      //@ts-ignore
      if (res.result) {
        message.destroy();
        message.success("修改成功");
      } else {
        message.destroy();
        message.error("修改失败");
      }
    }
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="文章标题"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              ></Input>
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} onChange={selectTypeHandle}>
                {typeInfo.map((item, index) => {
                  return (
                    //@ts-ignore
                    <Option key={index} value={item.id}>
                      {/* @ts-ignore */}
                      {item.typeName}
                    </Option>
                  );
                })}
                {/* <Option value="1"> 视频教程1</Option> */}
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
                value={articleContent}
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
              <Button type="primary" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
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
                <DatePicker
                  placeholder="发布日期"
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddArticle;
