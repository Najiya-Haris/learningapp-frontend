import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { userAxiosInstance } from "../../api/axios";
import { useQueryClient } from "@tanstack/react-query";

export function DialogWithForm({ name, id }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [username, setUserName] = useState("");
  console.log(name);
  const handleSubmit = async () => {
    userAxiosInstance.post("/editprofile", { username, id: id }).then(() => {
      queryClient.invalidateQueries("repoData"), handleOpen();
    });
  };

  useEffect(() => {
    setUserName(name);
  }, [name]);

  return (
    <>
      <Button onClick={handleOpen}>edit profile</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit Profile
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Your Name
            </Typography>
            <Input
              label="name"
              size="lg"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Update
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
