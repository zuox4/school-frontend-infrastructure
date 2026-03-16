import { Button, CellList, CellSimple, Container, Flex } from "@maxhub/max-ui";
import { Crown, Download, ShieldX } from "lucide-react";

export default function PermanentOut() {
  //   const shared = () => {
  //     window?.WebApp?.HapticFeedback.impactOccurred("rigid", true);
  //   };
  const cancelPermanent = () => {
    alert("asx");
    confirm("Вы уверены?");
  };
  return (
    <Container fullWidth style={{ width: "100%" }}>
      <Flex direction="column" gap={5} style={{ width: "100%" }}>
        {/* <Typography.Label
          style={{
            marginBottom: "16px",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Самостоятельный выход
        </Typography.Label> */}

        {/* 
        <Typography.Action style={{ color: "#666", textAlign: "center" }}>
          Здесь будут отображаться дети с правом самостоятельно покидать школу
        </Typography.Action> */}
        <CellList>
          <CellSimple
            style={{ border: "1px solid gold" }}
            title={"Иванов Иван"}
            before={<Crown />}
            subtitle={
              <div>
                <p>Выход по заявлению родителей</p>
                <Flex
                  gap={3}
                  align="center"
                  style={{ marginTop: "10px" }}
                  //   onClick={shared}
                >
                  <Download size={15} />
                  <span style={{ textDecoration: "underline" }}>
                    Скачать документ
                  </span>
                </Flex>
              </div>
            }
            after={
              <Flex gap={3} onClick={cancelPermanent}>
                <ShieldX color="red" />
              </Flex>
            }
          />
        </CellList>
        <Button stretched>Добавить ребенка</Button>
      </Flex>
    </Container>
  );
}
