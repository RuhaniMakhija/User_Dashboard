import React, { useState } from 'react'
import data from "./../MOCK_DATA.json"
import jsPDF from 'jspdf';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';



const UserDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

 
   const filteredData = data.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

   // Handle click on a user row
   const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsReportModalOpen(true);
  };


  const Row = ({ index, style, data: rowData }) => {
    const { id, username, email, phone, date } = rowData[index];
  
    return (
      <div
        style={style}
        className='flex border-b py-2 px-4 cursor-pointer'
        onClick={() => handleUserClick(rowData[index])}
      >
        <div className='w-1/5'>{id}</div>
        <div className='w-1/5'>{username}</div>
        <div className='w-1/5'>{email}</div>
        <div className='w-1/5'>{phone}</div>
        <div className='w-1/5'>{date}</div>
      </div>
    );
  };

  // Close the report modal
  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  // Generate report function (replace with your actual report generation logic)
  const generateReport = () => {
    const pdf = new jsPDF();

    // Create content for the PDF
    pdf.text(`User Report - ${selectedUser.username}`, 20, 20);
    pdf.text(`ID: ${selectedUser.id}`, 20, 30);
    pdf.text(`Username: ${selectedUser.username}`, 20, 40);
    pdf.text(`Email: ${selectedUser.email}`, 20, 50);
    pdf.text(`Phone: ${selectedUser.phone}`, 20, 60);
    pdf.text(`Date: ${selectedUser.date}`, 20, 70);

    // Save the PDF
    pdf.save(`UserReport_${selectedUser.username}.pdf`);

    closeReportModal();
  };
  return (
    <div className='w-[85vw] ml-[252px] mt-[5%] p-4'>
        <div className='flex my-6'>
            <h1 className='mr-4 font-bold'>Seach: </h1>
            <input 
                type='text'
                className='border-2 border-gray-500 rounded-md  px-2 mb-2'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <table className='min-w-full bg-white border border-gray-300'>
        <thead>
                <tr>
                    <th className='py-2 px-4 border-b'>ID</th>
                    <th className='py-2 px-4 border-b'>Username</th>
                    <th className='py-2 px-4 border-b'>Email</th>
                    <th className='py-2 px-4 border-b'>Phone</th>
                    <th className='py-2 px-4 border-b'>Date</th>
                </tr>
            </thead>
            </table>
        <AutoSizer>
            {({ height, width }) => (
            <FixedSizeList
            height={1000}
            width={width}
            itemSize={50} // Adjust the row height as needed
            itemCount={filteredData.length}
            itemData={filteredData}
            >
            {({ index, style }) => (
            <Row index={index} style={style} data={filteredData} onClick={() => handleUserClick(filteredData[index])}/>
          )}
          
        </FixedSizeList>
      )}
        </AutoSizer>
        {/* <table className='min-w-full bg-white border border-gray-300'>
            <thead>
                <tr>
                    <th className='py-2 px-4 border-b'>ID</th>
                    <th className='py-2 px-4 border-b'>Username</th>
                    <th className='py-2 px-4 border-b'>Email</th>
                    <th className='py-2 px-4 border-b'>Phone</th>
                    <th className='py-2 px-4 border-b'>Date</th>
                </tr>
            </thead>

            <tbody>
                {filteredData.map(({id, username, email, phone, date})=>(
                    <tr 
                        key={id} 
                        className='bg-green-100 cursor-pointer' 
                        onClick={() => handleUserClick({ id, username, email, phone, date })}
                    >
                        <td className='py-2 px-4 border-b'>{id}</td>
                        <td className='py-2 px-4 border-b'>{username}</td>
                        <td className='py-2 px-4 border-b'>{email}</td>
                        <td className='py-2 px-4 border-b'>{phone}</td>
                        <td className='py-2 px-4 border-b'>{date}</td>
                    </tr>
                ))}
            </tbody>
        </table> */}
        {isReportModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Generate Report</h2>
            <p>User: {selectedUser && selectedUser.username}</p>
            <button onClick={generateReport} className='bg-blue-500 text-white px-4 py-2 mt-4'>
              Generate Report
            </button>
            <button onClick={closeReportModal} className='bg-gray-300 text-gray-700 px-4 py-2 mt-4 ml-4'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetails
