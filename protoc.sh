protoc \
  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="./src/proto/stable" \
  --proto_path="./proto/core/stable" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "./proto/core/stable/tx.proto" 