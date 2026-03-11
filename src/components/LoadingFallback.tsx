import { Panel, Typography, Flex } from "@maxhub/max-ui";
import Lottie from "lottie-react";
import loadLottie from "../assets/loading.json";

export function LoadingFallback() {
  return (
    <Panel>
      <Flex direction="column" align="center" justify="center" gap={20}>
        <Lottie
          animationData={loadLottie}
          loop={true}
          size={10}
          style={{ width: 300, height: 300 }}
        />

        <Typography.Title>Загрузка...</Typography.Title>
      </Flex>
    </Panel>
  );
}
