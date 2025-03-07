import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { checkUserRole, fetchItemReports } from '../firebase';
import { onAuthStateChangedListener } from '../firebase';

import { timeSince } from '../context/timeUtils';
import 'bootstrap/dist/css/bootstrap.min.css';


function HomePage({ handleLogout }: { handleLogout: () => void }) {
  const [user, setUser] = useState<any | null>(null); // Adjust type as needed
  const [userRole, setUserRole] = useState<string | null>(null);
  const [reports, setReports] = useState<any[]>([]); // Adjust type as needed
  const [loadingReports, setLoadingReports] = useState(true);
  const [errorReports, setErrorReports] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoadingReports(true);
        setErrorReports(null);
        const reportsData = await fetchItemReports();
        setReports(reportsData);
      } catch (error: any) {
        setErrorReports(error.message);
      } finally {
        setLoadingReports(false);
      }
    };

    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        checkUserRole(currentUser.uid).then((role) => setUserRole(role));
      } else {
        setUserRole(null);
      }
    });


    if (user) {
      fetchReports();
    }
    return () => unsubscribe();
  }, [user]);

  return (
    <div className='container-fluid p-0 m-0'>
      {user ? (
        <>
          <p>Email console log: {user.email}</p>
          
            <div className="d-flex justify-content-between">
              <Link to="/report" className='btn btn-success'>Report an Item</Link>
              <button onClick={handleLogout} className='btn btn-outline-danger'>Logout</button> 
            </div>
            <br/>
            <br/>

            {loadingReports ? (
              <p>Loading reports...</p>
            ) : errorReports ? (
              <p>Error loading reports: {errorReports}</p>
            ) : (
              <div>
                <h2>Lost Item Reports</h2>
                {reports.map((report) => (
                  <div key={report.id} className="report-item card my-4">
                    <p className="text-secondary">{timeSince(report.timestamp)} ago</p>
                    <h3>{report.itemName}</h3>
                    <p>Category: {report.category}</p>
                    <p>Location: {report.location}</p>
                    <p>Description: {report.description}</p>
                  </div>
                ))}
              </div>
            )}
          
        </>
      ) : (
        <p>Please log in to access the home page content.</p>
      )}
    </div>
    
  );
}
export default HomePage;