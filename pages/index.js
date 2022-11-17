import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Text,
  Flex,
  VStack,
  Textarea,
  Link,
  Kbd,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import buildspaceLogo from '../assets/buildspace-logo.png';

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
    const scratchPadText = localStorage.getItem('scratchpad');
    setInput(scratchPadText);
  }, []);

  useEffect(() => {
    const keydownHandler = async (event) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
        event.preventDefault();
        await generateAction();
      }
      localStorage.setItem('scratchpad', input);
    };

    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [input, generateAction]);

  return (
    <Flex position="relative" minHeight="100vh">
      <Flex
        position="absolute"
        h="100%"
        w="100%"
        bgColor="black"
        flexDirection="column"
        letterSpacing="-0.08em"
      >
        <VStack
          w="100%"
          height="100%"
          spacing={5}
          color="white"
          justifyContent="center"
          alignItems="center"
        >
          <VStack padding={3}>
            <Text color="white" fontWeight="bold" fontSize="5xl" pl={3} pt={1}>
              Scratchpad
            </Text>
            <Text color="white" fontSize="2xl" textAlign="center">
              Write your own song, movie script, or anime in 2 minutes.
            </Text>
          </VStack>
          <Box
            h={{ base: '250px', md: '350px', lg: '400px' }}
            w={{ base: '80%', md: '60%', lg: '50%' }}
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
                bgColor="white"
                padding={2}
                mb={3}
                mr={2}
                borderRadius={5}
              >
                <Text color="black" fontWeight="bold" letterSpacing="-0.01em">
                  Keep writing to generate more!
                </Text>
              </Flex>
            )}
            <Textarea
              w="100%"
              h="100%"
              fontSize="18px"
              variant="outline"
              placeholder="type here to get started"
              value={input}
              onChange={onChange}
              isDisabled={isGenerating}
              bgColor="gray.900"
            />
            <Flex>
              <Text
                pt={2}
                fontSize="lg"
                fontWeight="bold"
                letterSpacing="-0.01em"
              >
                Press <Kbd color="gray.700">ctrl</Kbd> or{' '}
                <Kbd color="gray.700">cmd</Kbd> +{' '}
                <Kbd color="gray.700">enter</Kbd> to have your AI writer to help
                you generate the rest!
              </Text>
            </Flex>
          </Box>

          <HStack
            w="100%"
            position="absolute"
            bottom={0}
            justifyContent="center"
            pb={5}
          >
            <Image src={buildspaceLogo} width={25} alt="buildspace logo" />
            <Text fontSize="lg">
              build on{' '}
              <Link
                color="blue.300"
                href="https://buildspace.so/builds/ai-writer"
                isExternal
              >
                buildspace
              </Link>
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Home;
