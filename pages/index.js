import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Text,
  Flex,
  VStack,
  Textarea,
  Link,
  Kbd,
  Spinner,
} from '@chakra-ui/react';

const Home = () => {
  const [input, setInput] = useState('');
  const [finishReason, setFinishReason] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const generateAction = useCallback(async () => {
    setIsGenerating(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    const { choice } = data;

    setIsGenerating(false);

    setFinishReason(choice.finish_reason);

    if (choice.finish_reason === 'stop') {
      console.log('end of the completion!');
    }

    setInput((prevState) => {
      return prevState + choice.text;
    });
  }, [input]);

  useEffect(() => {
    const keydownHandler = async (event) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
        event.preventDefault();
        await generateAction();
      }
    };

    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [generateAction]);

  return (
    <Flex minHeight="100vh" bg="black">
      <Flex w="100%" alignItems="center" justifyContent="center">
        <VStack w="100%" color="white" spacing={10}>
          <VStack maxW={{ base: '80%', md: '60%', lg: '40%' }}>
            <Text fontWeight="bold" fontSize="4xl">
              ScratchPad
            </Text>
            <Text fontSize="xl">
              Write your first story, movie script, or song in 2 minutes. Type a
              few sentences and just press <Kbd color="gray.700">ctrl</Kbd> or{' '}
              <Kbd color="gray.700">cmd</Kbd> +{' '}
              <Kbd color="gray.700">enter</Kbd> to have your AI writer generate
              the rest!
            </Text>
          </VStack>
          <Box
            h={{ base: '250px', md: '500px', lg: '750px' }}
            w={{ base: '80%', md: '60%', lg: '40%' }}
            position="relative"
          >
            {isGenerating && (
              <Flex
                position="absolute"
                zIndex="1"
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner size="lg" />
              </Flex>
            )}
            {!isGenerating && finishReason === 'stop' && (
              <Flex
                position="absolute"
                zIndex="1"
                bottom={0}
                right={0}
                bgColor="blue.400"
                padding={2}
                mb={3}
                mr={2}
                borderRadius={5}
              >
                <Text fontWeight="bold">Keep writing to generate more!</Text>
              </Flex>
            )}
            <Textarea
              h="100%"
              w="100%"
              fontSize="18px"
              bgColor="#2A2C34"
              variant="outline"
              placeholder="type here to get started"
              value={input}
              onChange={onChange}
              isDisabled={isGenerating}
            />
          </Box>
          <Text fontSize="xl">
            built with{' '}
            <Link
              fontWeight="bold"
              color="blue.300"
              href="https://buildspace.so/builds/ai-writer"
              isExternal
            >
              buildspace
            </Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Home;
