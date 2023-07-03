
"use client"
import { registerUser } from "@/app/api";
import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation'
import { useMutation } from "react-query";
export default function Home() {
    const form = useForm({
        initialValues: {
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        },
      });
    const router = useRouter()
    const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait...",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Successfully created account",
      });

      router.push("/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Could not create account",
      });
    },
  });

    return (
   
     <Container>
        <Title>Register</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                placeholder="tomdoestech"
                required
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your strong password"
                required
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="Your strong password"
                required
                {...form.getInputProps("confirmPassword")}
              />

              <Button className="bg-blue-500" type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
      
    )
  }
  