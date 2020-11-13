const Upload = () => {
  const [filesList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(true);

  const handleUpload = () => {
    setUploading(false);
  };
  const props = {
    onRemove: (file) => {
      setFileList(() => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      setFileList(() => ({
        fileList: [...fileList, file],
      }));
      return false;
    },
    fileList,
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};

export default Upload;
