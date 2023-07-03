"use client"
import { login } from "@/app/api";
import { useMe } from "@/app/context/me";
import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation'
import { useMutation } from "react-query";
export default function Home() {

  const {refetch} = useMe()
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
    Parameters<typeof login>["0"]
  >(login, {
    onSuccess: () => {
      refetch();
      router.push("/");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Cannot log in",
      });
    },
  });

    return (
   
     <Container>
        <Title>Login</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your strong password"
                required
                {...form.getInputProps("password")}
              />

              <Button className="bg-blue-500" type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
      
    )
  }
  