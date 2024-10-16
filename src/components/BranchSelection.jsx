import React, { useContext, useEffect, useState } from 'react';
import { AppContentContext } from '../context/AppContentProvider.jsx';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const BranchSelection = () => {
  const { dcsURL, selectedBranch, setSelectedBranch } = useContext(AppContentContext);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${dcsURL}/api/v1/repos/unfoldingWord/en_tn/branches`);
        const branchNames = response.data.map(branch => branch.name)
        branchNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        setBranches(branchNames);
        if (! branchNames.includes(selectedBranch)) {
          setSelectedBranch('master');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();

    const intervalId = setInterval(fetchBranches, 100000); // 100000 ms = 1 minute

    return () => clearInterval(intervalId);
  }, [dcsURL]);

  useEffect(() => {
    if (branches.length && ! branches.includes(selectedBranch)) {
      setSelectedBranch('master');
    }
  }, [branches, selectedBranch]);

  return (
    <Autocomplete
      value={selectedBranch}
      onChange={(event, newValue) => {
        if (newValue && branches.includes(newValue)) {
          setSelectedBranch(newValue);
        }
      }}      
      options={branches}
      renderInput={(params) => <TextField {...params} label="Select a TN Branch (for fetching [optional] and merging rows)" variant="outlined" />}
      sx={{ margin: 2, width: "100%" }}
    />
  );
};

export default BranchSelection;