import React, { useState, useEffect } from "react";
import { Table, Space, Modal, message, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { getArticleList, delArticle } from "../../services/admin";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

interface DataType {
  title: string;
  typeName: string;
  addTime: string;
  view_count: number;
}

const ArticleList = () => {
  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "类别",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "发布时间",
      dataIndex: "addTime",
      key: "addTime",
    },
    {
      title: "浏览量",
      key: "view_count",
      dataIndex: "view_count",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //@ts-ignore
              updateArticle(record.id);
            }}
          >
            修改
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              //@ts-ignore
              deleteArticle(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  //获取文章列表
  const getData = async () => {
    const res = await getArticleList();
    //@ts-ignore
    setList(res.list);
    console.log(res, "<---");
  };

  //删除文章
  const deleteArticle = (id: any) => {
    confirm({
      title: "删除",
      content: "确认删除这篇文章吗？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        const res = await delArticle(id);
        debugger;
        //@ts-ignore
        if (res.result) {
          message.destroy();
          message.success("文章删除成功");
          getData();
        } else {
          message.destroy();
          message.error("文章删除失败");
        }
      },
      onCancel() {},
    });
  };

  //修改文章
  const updateArticle = (id: any) => {
    navigate(`/main/add/${id}`);
  };

  return (
    <div>
      <Table columns={columns} dataSource={list} />
    </div>
  );
};

export default ArticleList;
