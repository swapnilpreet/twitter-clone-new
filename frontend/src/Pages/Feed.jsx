import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Foryou from "./Foryou";
import Follwing from "./Follwing";

const Feed = () => {
  return (
    <>
      <Tabs isFitted>
        <TabList>
          <Tab>Feeds</Tab>
          <Tab>Followings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Foryou/>
          </TabPanel>
          <TabPanel>
            <Follwing/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Feed;
