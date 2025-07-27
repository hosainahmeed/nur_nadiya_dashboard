import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Avatar,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { UserOutlined, PhoneOutlined, EyeOutlined } from "@ant-design/icons";
import { CgBlock } from "react-icons/cg";
import { IoIosMail } from "react-icons/io";

// Dummy user data
const DUMMY_USERS = [
  {
    id: "1",
    userId: "auth1",
    name: "John Doe",
    contactNumber: "01710000000",
    email: "john@example.com",
    joined: new Date("2024-05-01").toLocaleDateString(),
    role: "User",
    isBlocked: false,
    profile_image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    userId: "auth2",
    name: "Jane Smith",
    contactNumber: "01720000000",
    email: "jane@example.com",
    joined: new Date("2024-04-10").toLocaleDateString(),
    role: "User",
    isBlocked: true,
    profile_image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    userId: "auth3",
    name: "Wade Warren",
    contactNumber: "(302) 555-0107",
    email: "WadeWarren@gmail.com",
    joined: new Date("2024-03-15").toLocaleDateString(),
    role: "User",
    isBlocked: false,
    profile_image: "https://i.pravatar.cc/150?img=3",
  },
];

// Dummy inquiries data
const DUMMY_INQUIRIES = [
  {
    id: "1",
    userId: "auth3",
    inquiryAbout: "Tenant",
    priceRange: "$1K - $10K",
    postedOn: "2025-04-10",
  },
  {
    id: "2",
    userId: "auth3",
    inquiryAbout: "Tenant",
    priceRange: "$1K - $10K",
    postedOn: "2025-05-10",
  },
  {
    id: "3",
    userId: "auth3",
    inquiryAbout: "Tenant",
    priceRange: "$1K - $10K",
    postedOn: "2025-05-10",
  },
  {
    id: "4",
    userId: "auth3",
    inquiryAbout: "Landlord",
    priceRange: "$1K - $10K",
    postedOn: "2025-06-10",
  },
];

const AllUsers = () => {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [modalActiveTab, setModalActiveTab] = useState("userInfo");

  // Filter users based on tab and search
  useEffect(() => {
    let list = [...users];

    if (activeTab === "2") {
      list = list.filter((user) => user.isBlocked);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter((user) => user.name.toLowerCase().includes(query));
    }

    setFilteredUsers(list);
  }, [users, searchQuery, activeTab]);

  const handleBlockToggle = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  const getUserInquiries = (userId) => {
    return DUMMY_INQUIRIES.filter((inquiry) => inquiry.userId === userId);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.profile_image} />
          {text}
        </Space>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Space>
          <IoIosMail />
          {email}
        </Space>
      ),
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
              setModalActiveTab("userInfo");
            }}
          />
          <Popconfirm
            title={`Are you sure you want to ${
              record.isBlocked ? "unblock" : "block"
            } this user?`}
            onConfirm={() => handleBlockToggle(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<CgBlock />} size="small" danger={record.isBlocked} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const inquiryColumns = [
    {
      title: "Inquiry about",
      dataIndex: "inquiryAbout",
      key: "inquiryAbout",
    },
    {
      title: "Price range",
      dataIndex: "priceRange",
      key: "priceRange",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
      key: "postedOn",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          size="small"
          style={{
            backgroundColor: "#8b5cf6",
            borderColor: "#8b5cf6",
            color: "white",
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const renderUserInfo = () => (
    <div>
      <div className="mb-4">
        <p style={{ color: "#8b5cf6", marginBottom: "8px", fontWeight: "500" }}>
          — Full Name
        </p>
        <p style={{ marginBottom: "0" }}>{selectedUser?.name}</p>
      </div>

      <div className="mb-4">
        <p style={{ color: "#8b5cf6", marginBottom: "8px", fontWeight: "500" }}>
          — Email
        </p>
        <p style={{ marginBottom: "0" }}>{selectedUser?.email}</p>
      </div>

      <div className="mb-6">
        <p style={{ color: "#8b5cf6", marginBottom: "8px", fontWeight: "500" }}>
          — Phone Number
        </p>
        <p style={{ marginBottom: "0" }}>{selectedUser?.contactNumber}</p>
      </div>

      <Button
        block
        style={{
          backgroundColor: "transparent",
          borderColor: "#ef4444",
          color: "#ef4444",
          height: "45px",
          fontSize: "16px",
        }}
        onClick={() => handleBlockToggle(selectedUser?.userId)}
      >
        {selectedUser?.isBlocked ? "Unblock This User" : "Block This User"}
      </Button>
    </div>
  );

  const renderInquiries = () => {
    const userInquiries = getUserInquiries(selectedUser?.userId);

    return (
      <div>
        <Table
          columns={inquiryColumns}
          dataSource={userInquiries}
          rowKey="id"
          pagination={{
            pageSize: 5,
            size: "small",
            showSizeChanger: false,
          }}
          size="small"
        />
      </div>
    );
  };

  const modalTabItems = [
    {
      key: "userInfo",
      label: "User Info",
      children: renderUserInfo(),
    },
    {
      key: "inquiries",
      label: "Inquiries",
      children: renderInquiries(),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="max-w-[400px] my-3">
        <Form>
          <Form.Item>
            <Input.Search
              placeholder="Search by name"
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </Form.Item>
        </Form>
      </div>

      <Tabs defaultActiveKey="1" onChange={setActiveTab}>
        <Tabs.TabPane tab="All Users" key="1" />
        <Tabs.TabPane tab="Blocked Users" key="2" />
      </Tabs>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        scroll={{ x: 1000 }}
        bordered
        pagination={{ pageSize: 5, size: "small" }}
      />

      {/* User Details Modal with Tabs */}
      <Modal
        centered
        open={userDetailsModal}
        onCancel={() => setUserDetailsModal(false)}
        footer={null}
        width={600}
      >
        <div className="flex flex-col items-center mb-6">
          <Avatar
            size={96}
            src={selectedUser?.profile_image}
            icon={<UserOutlined />}
          />
          <h1 className="text-2xl font-semibold mt-3 mb-0">
            {selectedUser?.name}
          </h1>
        </div>

        <Tabs
          activeKey={modalActiveTab}
          onChange={setModalActiveTab}
          items={modalTabItems}
          tabBarGutter={0}
        />
      </Modal>
    </div>
  );
};

export default AllUsers;
