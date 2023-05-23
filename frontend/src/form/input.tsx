import React from "react";
import { Input, message, Upload, } from "antd";
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Controller } from "effector-react-form";

type InputProps = {
  controller: Controller;
  label: React.ReactNode;
};

const { TextArea } = Input;
const { Dragger } = Upload;

const uploadProps: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export const InputField: React.FC<InputProps> = ({ controller, label }) => {
  const { input } = controller();

  return (
    <div className="input-wrap">
      <label>
        <span>{label}</span>
        <Input {...input} value={input.value || ''} className="input" />
      </label>
    </div>
  );
};

export const TextAreaField: React.FC<InputProps> = ({ controller, label }) => {
  const { input } = controller();

  return (
    <div className="input-wrap">
      <label>
        <span>{label}</span>
        <TextArea {...input} value={input.value || ''} className="input" />
      </label>
    </div>
  );
};

export const DocsUploadField: React.FC<InputProps> = ({ controller, label }) => {
  const { input } = controller();

  return (
    <div className="input-wrap">
      <label>
        <span>{label}</span>
        <Dragger {...input} multiple onChange={uploadProps.onChange} onDrop={uploadProps.onDrop}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Кликните или перетащите файлы для загрузки</p>
        </Dragger>
      </label>
    </div>
  );
};
